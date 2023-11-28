const { Router } = require('express')
const { ReqError, FuncCapsule } = require('../utils/Error')
const {createChallenge,updateChallenge,deleteChallenge} = require('../controllers/admin/challengesController.js');
const { getAllTeams , getTeam } = require('../controllers/admin/teamsController.js');
const { getAllUsers } = require('../controllers/admin/usersController.js')
const { getAllSubmissions } = require('../controllers/admin/submissionsController.js')

const adminRouter = Router();

adminRouter.use((req, res) => {
  if (!req.user || !req.user.isAdmin)
    throw new ReqError("Unauthorized", 401);
  next();
})

adminRouter.get("/",(req, res)=>{
  res.send("this is admin!");
})

adminRouter.post("/challenge",FuncCapsule(createChallenge))
adminRouter.put("/challenge/:id",FuncCapsule(updateChallenge))
adminRouter.delete("/challenge/:id",FuncCapsule(deleteChallenge))

adminRouter.get("/teams",FuncCapsule(getAllTeams))
adminRouter.get("/teams/:id",FuncCapsule(getTeam))

adminRouter.get("/users",FuncCapsule(getAllUsers))

adminRouter.get("/submissions",FuncCapsule(getAllSubmissions))


module.exports = adminRouter;
