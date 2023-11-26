const Submission = require('../model/submission');
const Team = require('../model/team');
const Challenge = require('../model/challenge');

const { prepareUser } = require('./utils')
const { ReqError } = require('../utils/Error')


// TODO: TEST THIS FUNCTIONS
// RETRIEVE ALL SUBMISSION BY IT'S TEAM
const GetAllTeamSubmissions = async (req, res, next) => {
  const { teamID } = req.params;
  const submissions = await Submission.find({ team: teamID });

  res.status(200).json(submissions);
}

// TODO: TEST THIS FUNCTIONS
// POST A SUBMISSION
const PostSubmission = async (req, res, next) => {
  const { challengeID } = req.params;
  const { repoLink } = req.body;

  if (!req.user.team)
    throw new ReqError("NO TEAM FOUND", 404);

  const team = await Team.findById(req.user.team)

  const challenge = await Challenge.findById(challengeID)

  if (!challenge)
    throw new ReqError('NO CHALLENGE FOUND', 404);

  let submission = await Submission.findOne({
    team: team._id,
    challenge: challenge._id
  })
  if (submission)
    throw new ReqError('Already Submitted', 201)

  submission = new Submission({
    team: req.user.team,
    submitter: req.user.username,
    challenge: challenge._id,
    repoLink: repoLink
  });
  await submission.save();
  console.log(`${req.user.username} has successfully submitted a solution for ${challenge.title}`);
  res.status(201).send("Successfully Submitted A Solution");
}

// TODO: TEST THIS FUNCTIONS
// EDIT A SUBMISSION
const EditSubmission = async (req, res, next) => {
  const { submissionID } = req.params;
  const { repoLink } = req.body;

  const submission =  await Submission.findById(submissionID)
  if(!req.user.isAdmin || Submission.team.members.find(member => member._id != req.user._id))
    throw new ReqError("Unauthorized", 401);

  submission.updateOne({$set: {repoLink: repoLink}}, {new: true});
  res.status(200).json(submission);
}

module.exports = {PostSubmission, GetAllTeamSubmissions, EditSubmission}