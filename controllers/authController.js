const User = require('../model/user');
const { ReqError } = require('../utils/Error');
const { genPassword } = require("../utils/passwordUtils")


const SignIn = (req, res, next) => {
  const user = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    username: req.user.username,
    email: req.user.email,
    team: req.user.team
  }

  // if(!req.user.team)
  //   return res.status(307).json({user, route: '/user/team'});// : MAKE THIS ROUTE POINTS INTO TEAM CREATION/JOINING

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
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  res.sendStatus(200);
}

module.exports = {SignIn, SignUp, SignOut}