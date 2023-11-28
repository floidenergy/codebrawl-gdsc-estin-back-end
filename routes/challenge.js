const { Router } = require('express')
const { FuncCapsule } = require('../utils/Error')
const { GetChalleges, GetChallengeByID } = require('../controllers/challengeController')

const challengeRouter = Router();

challengeRouter.get('/', FuncCapsule(GetChalleges));
challengeRouter.get('/:ID', FuncCapsule(GetChallengeByID));

module.exports = challengeRouter;