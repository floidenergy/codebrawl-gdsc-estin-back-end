const { Router } = require('express')
const { ReqError, FuncCapsule } = require('../utils/Error')
const {createChallenge,updateChallenge,deleteChallenge} = require('../controllers/admin/challengesController.js')

const adminRouter = Router();

// adminRouter.use((req, res) => {
//   if (!req.user || req.user.isAdmin)
//     throw new ReqError("Unauthorized", 401);
//   next();
// })

adminRouter.get("/",(req, res)=>{
  res.send("this is admin!");
})

adminRouter.post("/challenge",FuncCapsule(createChallenge))
adminRouter.put("/challenge/:id",FuncCapsule(updateChallenge))
adminRouter.delete("/challenge/:id",FuncCapsule(deleteChallenge))



module.exports = adminRouter;