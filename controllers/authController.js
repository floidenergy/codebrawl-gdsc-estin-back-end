const User = require('../model/user');
const { ReqError } = require('../utils/Error');
const { genPassword } = require("../utils/passwordUtils")


const SignIn = async (req, res, next) => {
  const user = req.user

  if (user.team) {
    await user.populate('team');
    await user.team.linkData()
  }

  user.prepareData();

  res.status(200).json(user);
}

const SignUp = async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password)
    throw new ReqError("MISSING FIELDS", 401)


  const { salt, hash } = genPassword(password);

  const user = new User({
    firstname,
    lastname,
    username,
    email,
    salt,
    hash,
  })

  await user.save();
  res.sendStatus(201);
}

const SignOut = (req, res, next) => {
  if (req.user)
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
      res.sendStatus(200);
    });
  else
    throw new ReqError("NO SESSION FOUND", 404)

}

module.exports = { SignIn, SignUp, SignOut }