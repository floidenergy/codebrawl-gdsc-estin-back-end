const { Router } = require('express')
const passport = require('passport')

const { TryCatch } = require("../utils/Error")
const { genPassword } = require("../utils/passwordUtils")

const User = require('../model/user')

const authRouter = Router();

// sing in
authRouter.post("/signIn", passport.authenticate('local'), (req, res, next) => {
  const user = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    username: req.user.username,
    email: req.user.email,
    team: req.user.team
  }

  res.status(200).json(user);
})

authRouter.post('/signUp', async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password)
    return res.status(401).send({ error: 'Missing fields' });

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
})

module.exports = authRouter;