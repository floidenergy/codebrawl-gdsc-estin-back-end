const Challenge = require("../../model/challenge");

module.exports.createChallenge = async (req, res) => {
  const { name, description, link, category, difficulty, creator } = req.body;
  if (!name || !description || !link || !category || !difficulty || !creator) {
    return res
      .status(400)
      .json({ status: 400, error: "All fields are required." });
  }
  const existingChallenge = await Challenge.findOne({ name });
  if (existingChallenge) {
    return res
      .status(400)
      .json({
        status: 400,
        error: "Challenge with the same name already exists.",
      });
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

  const existingChallenge = await Challenge.findById(id);
  if (!existingChallenge) {
    return res.status(404).json({ status: 404, error: "Challenge not found." });
  }
  let challenge = await Challenge.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ status: 200, data: challenge });
};

module.exports.deleteChallenge = async (req, res) => {
  const { id } = req.params;
  const challenge = await Challenge.findByIdAndDelete(id);

  if (!challenge) {
    res.status(404).json({ status: 404, error: "Challenge not found" });
  } else {
    res.json({ status: 200, message: "Challenge deleted successfully" });
  }
};
