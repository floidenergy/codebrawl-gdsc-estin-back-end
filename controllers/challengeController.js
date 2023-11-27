const Challenge = require('../model/challenge');
const { ReqError } = require('../utils/Error')

const GetChalleges = async (req, res) => {
  const { category } = req.query
  const challenges = await Challenge.find({ category: category });
  if (!challenges)
    throw new ReqError("NO CHALLEGES FOUND", 404);

  res.status(200).json(challenges);
}

const GetChallengeByID = async (req, res) => {
  const { ID } = req.params;
  const challenge = await Challenge.findById(ID);
  if (!challenge)
    throw new ReqError("CHALLENGE NOT FOUND", 404);

  res.status(200).json(challenge);
}

module.exports = {GetChalleges, GetChallengeByID}