const { v4 } = require('uuid')
const { ReqError } = require('../utils/Error')
const Team = require('../model/team')
const User = require('../model/user')


const CreateTeam = async (req, res, next) => {
  const { name, category } = req.body;

  if (req.user.team)
    throw new ReqError("YOU ARE ALREADY IN A TEAM", 401);

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

  team.leader.preparePublicData();
  res.status(201).json(team);
}

const JoinTeam = async (req, res, next) => {
  const { joinCode } = req.params;

  // check if he already has a team
  if (req.user.team)
    throw new ReqError("You are already in a team");

  const team = await Team.findOne({ joiningcode: joinCode.toUpperCase() });

  // check if team is valid
  if (!team)
    throw new ReqError('Team not found', 404);

  // check if he is already in this team
  if (team.members.includes(req.user.id))
    throw new ReqError('You are already in this team', 400);



  team.addMember(req.user.id)
  await team.save()

  res.status(200).json(team);
}

const LeaveTeam = async (req, res) => {
  const team = await Team.findById(req.user.team);

  // check if it's a valid team
  if (!team)
    throw new ReqError("Team not found", 404);

  // check if the user is in the team (ik it's usless bessah ghemd 3inik LOL)
  if (!team._id == req.user.team)
    throw new ReqError("You are not in this team", 401);

  // remove the member from the team
  team.removeMember(req.user.id)

  // check if leader leaves or the team will reminde empty when member leaves => if true delete team 
  if (team.leader == req.user.id || team.members.length <= 0) {
    await team.linkData();
    // remove all team data from the User object
    await Promise.all(team.members.map(async (member) => {
      // await User.findByIdAndUpdate(member._id, { $unset: { team: 1 } })
      // console.log(member);
      await team.removeMember(member)
    }))

    await team.deleteOne();
  }

  res.sendStatus(200)
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

  const target = await User.findById(memberID);
  target.team = undefined;
  await target.save();

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
    code = v4().replace(/[^a-zA-Z]/g, '').slice(0, 6).toUpperCase();
    codeDoesExist = await Team.findOne({ code: code });
  } while (codeDoesExist);

  team.joiningcode = code;
  await team.save();

  res.status(201).json({ code });
}

module.exports = { CreateTeam, JoinTeam, LeaveTeam, KickUserFromTeam, RefreshCode }