const { Router } = require('express')
const passport = require('passport')

const { FuncCapsule } = require("../utils/Error")
const {SignIn, SignUp, SignOut} = require('../controllers/authController')


const authRouter = Router();

// sing in
authRouter.post("/signIn",
  passport.authenticate('local'),
  FuncCapsule(SignIn)
)

authRouter.post('/signUp', FuncCapsule(SignUp))

authRouter.post('/signOut', FuncCapsule(SignOut))

module.exports = authRouter;