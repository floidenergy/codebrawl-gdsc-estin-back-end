const Challenge = require("../../model/challenge");

module.exports.createChallenge = async (req, res) => {
  try {
    const { name, description, link, category, difficulty } = req.body;

    const challenge = new Challenge({
      name,
      description,
      link,
      category,
      difficulty,
    });
    await challenge.save();
    res.status(200).json({ status: 200, data: challenge });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};

module.exports.updateChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    let challenge = await Challenge.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ status: 200, data: challenge });
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};

module.exports.deleteChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await Challenge.findByIdAndDelete(id);

    if (!challenge) {
      res.status(404).json({ status: 404, error: 'Challenge not found' });
    } else {
      res.json({ status: 200, message: 'Challenge deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting challenge:', error);
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};

