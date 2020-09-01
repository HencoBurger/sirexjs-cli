'use strict';

// auth Middleware
module.exports = function(req, res, done) {
  console.log('Ran Auth middleware');
  done();
};

