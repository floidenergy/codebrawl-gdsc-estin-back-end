const Submission = require('../../model/submission')

module.exports.getAllSubmissions = async(req,res)=>{
  const submission = await Submission.find();
  if(submission.length === 0){
    throw ReqError("submissions not found",404);
  }
  res.status(200).json({status: 200,data:submission})
}