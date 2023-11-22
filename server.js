require('dotenv').config()
const express = require('express')

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");

const cors = require('cors')
const morgan = require('morgan')

const server = express();

server.get('/', (req, res, next) => {
  res.send('welcome to codebrawl back end server');
})


module.exports.mongoose = mongoose;
module.exports.server = server;
