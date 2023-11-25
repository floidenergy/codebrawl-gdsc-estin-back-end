const Submission = require('../model/submission')
const Team = require('../model/team')

// TODO: POST A SUBMISSION
const PostSubmission = async (req, res, next) => {
  const { challengeID } = req.params;
  const { repoLink } = req.body;
}

// TODO: RETRIEVE ALL SUBMISSION BY IT'S TEAM
// TODO: EDIT A SUBMISSION