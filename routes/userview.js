//Core Module'
const path = require('path');

const express = require('express');

const userRouter = express.Router();

//Local Module
const rootDir = require('../utils/pathutil');

const Controllers = require('../controllers/HOME')

userRouter.get('/', Controllers.Homepage);

module.exports = userRouter;