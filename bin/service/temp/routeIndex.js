'use strict';

const express = require('express');
const router = express.Router();

// User authentication
const {
  Services,
  Middleware
} = require('sirexjs');

module.exports = (function () {

  // Tasks service example
  router.use('/tasks', Services.tasks.routes);

  router.use('*', (req, res) => {
    res.status(200).send(`Resource not be found.`);
  });

  return router;
})();
