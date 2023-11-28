const Challenge = require("../../model/challenge");
const { ReqError } = require("../../utils/Error");

module.exports.createChallenge = async (req, res) => {
  const { name, description, link, category, difficulty, creator } = req.body;
  if (!name || !description || !link || !category || !difficulty || !creator) {
    throw ReqError("All fields are required." ,400)
  }
  const existingChallenge = await Challenge.findOne({ name });
  if (existingChallenge) {
    throw ReqError("Challenge with the same name already exists",400);
  }
  const challenge = new Challenge({
    name,
    description,
    link,
    category,
    difficulty,
    creator,
  });

  await challenge.save();
  res.status(200).json({ status: 200, data: challenge });
};

module.exports.updateChallenge = async (req, res) => {
  const { id } = req.params;
  const { name, description, link, category, difficulty, creator } = req.body;
  const existingChallenge = await Challenge.findById(id);
  if (!existingChallenge) {
    throw ReqError("Challenge not found." ,404);
  }
  let challenge = await Challenge.findByIdAndUpdate(id,  { name, description, link, category, difficulty, creator }, {
    new: true,
  });

  res.status(200).json({ status: 200, data: challenge });
};

module.exports.deleteChallenge = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findByIdAndDelete(id);

  if (!challenge) {
    throw ReqError( "Challenge not found" ,400)
  } else {
    res.json({ status: 200, message: "Challenge deleted successfully" });
  }
};
