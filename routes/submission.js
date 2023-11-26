const {Router} = require('express')
const {ReqError, FuncCapsule} = require('../utils/Error')
const {PostSubmission, GetAllTeamSubmissions, EditSubmission} = require('../controllers/submissionController')

const submissionRouter = Router();

submissionRouter.use((req, res, next) => {
  if (!req.user)
    return next(new ReqError(401, 'Unauthorized'));

  next();
})

submissionRouter.get("/:teamID", FuncCapsule(GetAllTeamSubmissions));
submissionRouter.post("/:challengeID", FuncCapsule(PostSubmission));
submissionRouter.put("/:submissionID", FuncCapsule(EditSubmission));