const { Router } = require('express')
const { ReqError, FuncCapsule } = require('../utils/Error')

const adminRouter = Router();

adminRouter.use((req, res) => {
  if (!req.user || req.user.isAdmin)
    return next(new ReqError('NO SESSION FOUND', 401))

  next()
})



module.exports = adminRouter;