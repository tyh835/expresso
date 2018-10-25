const express = require('express');
const employeesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Tertiary Router
const timesheetsRouter = require('./timesheets.js');
employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

// Processes the parameter employeeId
employeesRouter.param('employeeId', (req, res, next, id) => {
  const employeeId = Number(id);
  db.get(`SELECT * FROM Employee WHERE id = ${employeeId}`, (err, employee) => {
    if (err) {
      next(err);
    } else if (employee) {
      req.employee = employee;
      req.employeeId = employeeId;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Handles GET requests for all active employees
employeesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Employee WHERE is_current_employee = 1', (err, employees) => {
    if (err) {
      next(err);
    }
    if (employees && employees.length !== 0) {
      res.status(200).json({employees: employees});
    } else {
      res.sendStatus(404);
    }
  })
});

// Handles GET requests for a single employee by id
employeesRouter.get('/:employeeId', (req, res, next) => {
  res.status(200).json({employee: req.employee});
});

// Handles POST requests for new employees
employeesRouter.post('/', (req, res, next) => {
  const newEmployee = req.body.employee;
  // Check if the required information is present
  if (newEmployee && newEmployee.name && newEmployee.position && newEmployee.wage) {
    db.run('INSERT INTO Employee (name, position, wage, is_current_employee) VALUES ($name, $position, $wage, 1)', {
      $name: newEmployee.name,
      $position: newEmployee.position,
      $wage: newEmployee.wage
    }, function(err) {
      db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`, (err, newEmployee) => {
        if (err) {
          next(err);
        }
        res.status(201).json({employee: newEmployee});
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles PUT requests for a single employee by id
employeesRouter.put('/:employeeId', (req, res, next) => {
  const updatedEmployee = req.body.employee;
  const prevId = req.employeeId;
  // Check if the required information is present
  if (updatedEmployee && updatedEmployee.name && updatedEmployee.position && updatedEmployee.wage) {
    // DELETE existing employee then INSERT updated employee into database
    db.serialize(() => {
      db.run('DELETE FROM Employee WHERE id = $id', {
        $id: prevId
      }, err => {
        if (err) {
          next(err);
        }
      });
      db.run('INSERT INTO Employee (id, name, position, wage, is_current_employee) VALUES ($id, $name, $position, $wage, $isCurrentlyEmployed)', {
        $id: prevId,
        $name: updatedEmployee.name,
        $position: updatedEmployee.position,
        $wage: updatedEmployee.wage,
        $isCurrentlyEmployed: updatedEmployee.isCurrentlyEmployed === 0 ? 0 : 1
      }, function(err) {
        if (err) {
          next(err);
        }
        db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`, (err, updatedEmployee) => {
          if (err) {
            next(err);
          }
          res.status(200).json({employee: updatedEmployee});
        });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles DELETE requests for a single employee by id
employeesRouter.delete('/:employeeId', (req, res, next) => {
  if (req.employee && req.employeeId) {
    db.run('UPDATE Employee SET is_current_employee = 0 WHERE id = $id', {
      $id: req.employeeId
    }, err => {
      if (err) {
        next(err);
      }
      db.get(`SELECT * FROM Employee WHERE id = ${req.employeeId}`, (err, deletedEmployee) => {
        if (err) {
          next(err);
        }
        // Send status 200 because employee still exists in database, just "not employed"
        res.status(200).json({
          employee: deletedEmployee
        });
      });
    });
  }
});

module.exports = employeesRouter;
