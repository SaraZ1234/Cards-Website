//Core path
const path = require('path');

const express = require('express');

const setRouter = express.Router();

//Local Module
const rootDir = require('../utils/pathutil');

const Controllers = require('../controllers/HOME')

setRouter.get('/card.html', Controllers.interface);

setRouter.get('/card.html/:homeId', Controllers.getHomeDetail);

module.exports = setRouter;
