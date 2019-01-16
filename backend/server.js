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
}

if (process.env.NODE_ENV === 'prod') {
  app.use(morgan('common'));
  app.use(express.static('client/build'));
}

const apiRouter = require('./api_v1/api.js');
app.use('/api/v1', apiRouter);

if (process.env.NODE_ENV === 'dev') {
  app.use(errorhandler());
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
