const { Router } = require("express");
const Team = require('../model/team')
const { ReqError, FuncCapsule } = require('../utils/Error')
const {
  CreateTeam,
  JoinTeam,
  LeaveTeam,
  KickUserFromTeam,
  RefreshCode
} = require('../controllers/teamController')

const teamRouter = Router();

teamRouter.use((req, res, next) => {
  if (!req.user)
    return next(new ReqError(401, 'Unauthorized'))

  next()
})

// create a team
teamRouter.post('/', FuncCapsule(CreateTeam))

// join a team
teamRouter.put('/join/:joinCode', FuncCapsule(JoinTeam));

// leave a team
teamRouter.put('/leave/:teamID', FuncCapsule(LeaveTeam))

// kick member from the team
teamRouter.put('/kick/:teamID/:memberID', FuncCapsule(KickUserFromTeam))

// refresh joining code
teamRouter.put('/code/:teamID', FuncCapsule(RefreshCode))

module.exports = teamRouter;