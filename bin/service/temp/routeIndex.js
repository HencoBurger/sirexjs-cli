'use strict';

const express = require('express');
const router = express.Router();

// User authentication
const {
  Services,
  middleware
} = require('sirexjs');

module.exports = (function () {

  router.use('*', (req, res) =>{
    res.status(404).send(`Resource not be found.`);
  });

  return router;
})();
