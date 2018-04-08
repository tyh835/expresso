// Express and Middleware Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');

// Server Components
const app = express();
const apiRouter = require('./api/api.js');

const PORT = process.env.PORT || 4000;
const environment = app.get('env');

// Database Components
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Primary Router
app.use('/api', apiRouter);

// Error Handler
if (environment === 'development') {
  app.use(errorhandler());
}

// Starts Server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
