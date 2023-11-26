const { v4 } = require('uuid')
const { ReqError } = require('../utils/Error')
const { prepareUser } = require('./utils')
const Team = require('../model/team')
const User = require('../model/user')


const CreateTeam = async (req, res, next) => {
  const { name, category } = req.body;

  if (!name || !category)
    throw new ReqError("MISSING FIELDS", 401);

  let code;
  let codeDoesExist;

  do {
    code = v4().replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
    codeDoesExist = await Team.findOne({ code: code });
  } while (codeDoesExist);

  const team = new Team({
    name,
    chosenCategory: category,
    leader: req.user,
    members: [req.user],
    joiningcode: code
  });

  await team.save();
  await User.findByIdAndUpdate(req.user.id, { team: team })

  team.leader = prepareUser(team.leader);
  res.status(201).json(team);
}

const JoinTeam = async (req, res, next) => {
  const { joinCode } = req.params;

  const team = await Team.findOne({ joiningcode: joinCode });
  if (!team)
    throw new ReqError('Team not found', 404);

  if (team.members.includes(req.user))
    throw new ReqError('You are already in this team', 400);

  team.members.push(req.user);
  await team.save();

  res.status(200).json(team);
}

const LeaveTeam = (req, res, next) => {
  const { teamID } = req.params;
  Team.findByIdAndUpdate(teamID, {
    $pull: {
      members:
        req.user
    }
  }, (err, team) => {
    if (err)
      throw new ReqError('Error while leaving team', 500);
    res.status(200).json(team);
  });
}

const KickUserFromTeam = async (req, res, next) => {
  const { teamID, memberID } = req.params;
  const team = await Team.findById(teamID);
  if (!team)
    throw new ReqError('Team not found', 404);

  if (!team.leader._id.equals(req.user._id))
    throw new ReqError('You are not the leader of this team', 403);

  if (!team.members.includes(memberID))
    throw new ReqError('Member not found in team', 404);

  team.members = team.members.filter(member => member._id.toString() !== memberID);
  await team.save();

  res.status(200).json(team);
}

const RefreshCode = async (req, res, next) => {
  const { teamID } = req.params;

  const team = await Team.findById(teamID).populate('leader');

  if (team.leader.id !== req.user.id)
    throw new ReqError("unauthorized", 401);

  let code;
  let codeDoesExist;

  do {
    code = v4().replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
    codeDoesExist = await Team.findOne({ code: code });
  } while (codeDoesExist);

  team.joiningcode = code;
  await team.save();

  res.status(201).json({ code });
}

module.exports = { CreateTeam, JoinTeam, LeaveTeam, KickUserFromTeam, RefreshCode }