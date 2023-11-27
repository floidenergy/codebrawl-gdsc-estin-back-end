const { Router } = require('express');
const { FuncCapsule } = require('../utils/Error')
const { GetCategories } = require('../controllers/categoryController')

const categoryRouter = Router();

categoryRouter.get("/", FuncCapsule(GetCategories))

module.exports = categoryRouter