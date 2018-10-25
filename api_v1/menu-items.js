const express = require('express');
const menuItemsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Processes the parameter menuItemId
menuItemsRouter.param('menuItemId', (req, res, next, id) => {
  const menuItemId = Number(id);
  db.get(`SELECT * FROM MenuItem WHERE id = ${menuItemId}`, (err, menuItem) => {
    if (err) {
      next(err);
    } else if (menuItem) {
      req.menuItemId = menuItemId;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Handles GET requests for all menuItems for a menu
menuItemsRouter.get('/', (req, res, next) => {
  if (req.menuId) {
    db.all(`SELECT * FROM MenuItem WHERE menu_id = ${req.menuId}`, (err, menuItems) => {
      if (err) {
        next(err);
      }
      if (menuItems && menuItems.length !== 0) {
        res.status(200).json({menuItems: menuItems});
      } else {
        res.status(200).json({menuItems: []});
      }
    });
  }
});

// Handles POST requests for new menuItem for a menu
menuItemsRouter.post('/', (req, res, next) => {
  const newMenuItem = req.body.menuItem;
  if (newMenuItem && newMenuItem.name && newMenuItem.description && newMenuItem.inventory && newMenuItem.price && req.menuId) {
    db.run('INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)', {
      $name: newMenuItem.name,
      $description: newMenuItem.description,
      $inventory: newMenuItem.inventory,
      $price: newMenuItem.price,
      $menuId: req.menuId
    }, function(err) {
      if (err) {
        next(err);
      }
      db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`, (err, newMenuItem) => {
        if (err) {
          next(err);
        }
        res.status(201).json({menuItem: newMenuItem});
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles PUT requests for a single menuItem by id
menuItemsRouter.put('/:menuItemId', (req, res, next) => {
  const updatedMenuItem = req.body.menuItem;
  const prevId = req.menuItemId;
  // Check if the required information is present
  if (updatedMenuItem && updatedMenuItem.name && updatedMenuItem.description && updatedMenuItem.inventory && updatedMenuItem.price && req.menuId) {
    // DELETE existing menuItem then INSERT updated menuItem into database
    db.serialize(() => {
      db.run('DELETE FROM MenuItem WHERE id = $id', {
        $id: prevId
      }, err => {
        if (err) {
          next(err);
        }
      });
      db.run('INSERT INTO MenuItem (id, name, description, inventory, price, menu_id) VALUES ($id, $name, $description, $inventory, $price, $menuId)', {
        $id: prevId,
        $name: updatedMenuItem.name,
        $description: updatedMenuItem.description,
        $inventory: updatedMenuItem.inventory,
        $price: updatedMenuItem.price,
        $menuId: req.menuId
      }, function(err) {
        if (err) {
          next(err);
        }
        db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`, (err, updatedMenuItem) => {
          if (err) {
            next(err);
          }
          res.status(200).json({menuItem: updatedMenuItem});
        });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles DELETE requests for a single menuItem by id
menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
  if (req.menuItemId) {
    db.run('DELETE FROM MenuItem WHERE id = $id', {
      $id: req.menuItemId
    }, err => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
});

module.exports = menuItemsRouter;
