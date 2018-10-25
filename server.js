const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'prod') {
  app.use(morgan('common'));
  app.use(express.static('client/build'));
}

const apiRouter = require('./api/api.js');
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'dev') {
  app.use(errorhandler());
}

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
