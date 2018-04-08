const express = require('express');
const apiRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Secondary Routers
const menusRouter = require('./menus.js');
const employeesRouter = require('./employees.js');

apiRouter.use('/menus', menusRouter);
apiRouter.use('/series', employeesRouter);

module.exports = apiRouter;
