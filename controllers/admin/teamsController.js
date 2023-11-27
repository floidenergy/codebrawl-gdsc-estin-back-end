const Team = require("../../model/team");

module.exports.getAllTeams = async (req, res) => {
  const teams = await Team.find();
  if (teams.length == 0) {
    throw ReqError("teams not found", 404);
  }
  const teamNames = teams.map((team) => team.name);
  res.status(200).json({ status: 200, data: { names: teamNames } });
};

module.exports.getTeam = async (req, res) => {
  const { id } = req.params;
  const team = await Team.findById({ id });
  if (!team) {
    throw ReqError("team not found", 404);
  }
  res.status(200).json({ status: 200, data: team });
};
