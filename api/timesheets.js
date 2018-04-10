const express = require('express');
const timesheetsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Processes the parameter timesheetId
timesheetsRouter.param('timesheetId', (req, res, next, id) => {
  const timesheetId = Number(id);
  db.get(`SELECT * FROM Timesheet WHERE id = ${timesheetId}`, (err, timesheet) => {
    if (err) {
      next(err);
    } else if (timesheet) {
      req.timesheetId = timesheetId;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Handles GET requests for all timesheets for an employee
timesheetsRouter.get('/', (req, res, next) => {
  if (req.employeeId) {
    db.all(`SELECT * FROM Timesheet WHERE employee_id = ${req.employeeId}`, (err, timesheets) => {
      if (err) {
        next(err);
      }
      if (timesheets && timesheets.length !== 0) {
        res.status(200).json({timesheets: timesheets});
      } else {
        res.status(200).json({timesheets: []});
      }
    });
  }
});

// Handles POST requests for new timesheet for an employee
timesheetsRouter.post('/', (req, res, next) => {
  const newTimesheet = req.body.timesheet;
  if (newTimesheet && newTimesheet.hours && newTimesheet.rate && newTimesheet.date && req.employeeId) {
    db.run('INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employeeId)', {
      $hours: newTimesheet.hours,
      $rate: newTimesheet.rate,
      $date: newTimesheet.date,
      $employeeId: req.employeeId
    }, function(err) {
      if (err) {
        next(err);
      }
      db.get(`SELECT * FROM Timesheet WHERE id = ${this.lastID}`, (err, newTimesheet) => {
        if (err) {
          next(err);
        }
        res.status(201).json({timesheet: newTimesheet});
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles PUT requests for a single timesheet by id
timesheetsRouter.put('/:timesheetId', (req, res, next) => {
  const updatedTimesheet = req.body.timesheet;
  const prevId = req.timesheetId;
  // Check if the required information is present
  if (updatedTimesheet && updatedTimesheet.hours && updatedTimesheet.rate && updatedTimesheet.date && req.employeeId) {
    // DELETE existing timesheet then INSERT updated timesheet into database
    db.serialize(() => {
      db.run(`DELETE FROM Timesheet WHERE id = ${prevId}`, err => {
        if (err) {
          next(err);
        }
      });
      db.run('INSERT INTO Timesheet (id, hours, rate, date, employee_id) VALUES ($id, $hours, $rate, $date, $employeeId)', {
        $id: prevId,
        $hours: updatedTimesheet.hours,
        $rate: updatedTimesheet.rate,
        $date: updatedTimesheet.date,
        $employeeId: req.employeeId
      }, function(err) {
        if (err) {
          next(err);
        }
        db.get(`SELECT * FROM Timesheet WHERE id = ${this.lastID}`, (err, updatedTimesheet) => {
          if (err) {
            next(err);
          }
          res.status(200).json({timesheet: updatedTimesheet});
        });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles DELETE requests for a single issue by id
timesheetsRouter.delete('/:timesheetId', (req, res, next) => {
  if (req.timesheetId) {
    db.run(`DELETE FROM Timesheet WHERE id = ${req.timesheetId}`, err => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
});

module.exports = timesheetsRouter;
