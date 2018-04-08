const express = require('express');
const employeesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Tertiary Router
const timesheetsRouter = require('./menu-items.js');
employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

module.exports = employeesRouter;
