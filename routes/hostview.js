//Core path
const path = require('path');

const express = require('express');
const hostRouter = express.Router();

const rootDir = require('../utils/pathutil');

const Controllers = require('../controllers/HOME');

hostRouter.get('/', Controllers.getHome);


hostRouter.post('/', Controllers.postHome);

hostRouter.get('/delete', Controllers.delPage);

hostRouter.get('/host-card', Controllers.host_interface);

//For dealing with deletion
// hostRouter.get('/delete/:homeId', Controllers.deleteHome);
hostRouter.post('/delete/:homeId', Controllers.deleteNote);
// hostRouter.post('/host/delete/:homeId', homeController.deleteNote);



exports.hostRouter = hostRouter;

