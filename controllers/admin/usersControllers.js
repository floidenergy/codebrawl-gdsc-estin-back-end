const User = require('../../model/user')
module.exports.getAllUsers = async(req, res)=>{
  const Users = await User.find({},{ salt: 0, hash: 0, isAdmin: 0 });
  if(Users.length === 0){
   throw ReqError("users not found",404);
  }
  res.status(200).json({status: 200,data:Users})
}