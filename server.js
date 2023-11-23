require('dotenv').config()
const express = require('express')

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");

const errorHandler = require("./controllers/errorHandler")

const authRouter = require('./routes/authentification')
const teamRouter = require('./routes/team')

const cors = require('cors')
const morgan = require('morgan')

const server = express();

server.use(morgan('dev'));
server.use(cors({origin: process.env.ALLOWED_ORIGIN.split(', '), credentials: true}));

server.use(express.json({ limit: '2mb' }));
server.use(express.urlencoded({ extended: false }));

server.use(express.static('./public'));

server.use(session({
  name: 'codebrawler',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStorage({
    mongoUrl: process.env.DB_STRING,
    dbName: "codebrawl",
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  }
}))

require('./utils/passport')

server.use(passport.initialize())
server.use(passport.session());

server.use('/auth', authRouter);
server.use('/team', teamRouter);

server.get('/', (req, res, next) => {
  console.log(req.user);
  res.send('welcome to codebrawl back end server');
})

// error handler
server.use(errorHandler);

module.exports.mongoose = mongoose;
module.exports.server = server;


