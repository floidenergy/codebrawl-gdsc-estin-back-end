const { Router } = require('express')
const { ReqError, FuncCapsule } = require('../utils/Error')

const adminRouter = Router();

adminRouter.use((req, res) => {
  if (!req.user || req.user.isAdmin)
    throw new ReqError("Unauthorized", 401);
  next();
})



module.exports = adminRouter;