const express = require('express');
const menusRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Tertiary Router
const menuItemsRouter = require('./menu-items.js');
menusRouter.use('/:menuId/menu-items', menuItemsRouter);

// Processes the parameter menuId
menusRouter.param('menuId', (req, res, next, id) => {
  const menuId = Number(id);
  db.get('SELECT * FROM Menu WHERE id = $id', {
    $id: menuId
  }, (err, menu) => {
    if (err) {
      next(err);
    } else if (menu) {
      req.menu = menu;
      req.menuId = menuId;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Handles GET requests for all menus
menusRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Menu', (err, menus) => {
    if (err) {
      next(err);
    }
    if (menus && menus.length !== 0) {
      res.status(200).json({menus: menus});
    } else {
      res.sendStatus(404);
    }
  })
});

// Handles GET requests for a single menu by id
menusRouter.get('/:menuId', (req, res, next) => {
  res.status(200).json({menu: req.menu});
});

// Handles POST requests for new menus
menusRouter.post('/', (req, res, next) => {
  const newMenu = req.body.menu;
  // Check if the required information is present
  if (newMenu && newMenu.title) {
    db.run('INSERT INTO Menu (title) VALUES ($title)', {
      $title: newMenu.title
    }, function (err) {
      if (err) {
        next(err);
      }
      db.get('SELECT * FROM Menu WHERE id = $id', {
        $id: this.lastID
      }, (err, newMenu) => {
        if (err) {
          next(err);
        }
        res.status(201).json({
          menu: newMenu
        });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles PUT requests for a single menu by id
menusRouter.put('/:menuId', (req, res, next) => {
  const updatedMenu = req.body.menu;
  const prevId = req.menuId;
  // Check if the required information is present
  if (updatedMenu && updatedMenu.title) {
    // DELETE existing menu then INSERT updated menu into database
    db.serialize(() => {
      db.run('DELETE FROM Menu WHERE id = $id', {
        $id: prevId
      }, err => {
        if (err) {
          next(err);
        }
      });
      db.run('INSERT INTO Menu (id, title) VALUES ($id, $title)', {
        $id: prevId,
        $title: updatedMenu.title,
      }, function(err) {
        if (err) {
          next(err);
        }
        db.get('SELECT * FROM Menu WHERE id = $id', {
          $id: this.lastID
        }, (err, updatedMenu) => {
          if (err) {
            next(err);
          }
          res.status(200).json({
            menu: updatedMenu
          });
        });
      });
    });
  } else {
    res.sendStatus(400);
  }
});

// Handles DELETE requests for a single menu by id
menusRouter.delete('/:menuId', (req, res, next) => {
  if (req.menu && req.menuId) {
    db.all('SELECT * FROM MenuItem WHERE menu_id = $id', {
      $id: req.menuId
    }, (err, menuItems) => {
      if (err) {
        next(err);
      }
      if (menuItems.length === 0) {
        db.run('DELETE FROM Menu WHERE id = $id', {
          $id: req.menuId
        }, err => {
          if (err) {
            next(err);
          }
          res.sendStatus(204);
        });
      } else {
        res.sendStatus(400);
      }
    });
  }
});

module.exports = menusRouter;
