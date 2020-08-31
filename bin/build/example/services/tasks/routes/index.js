'use strict';

const express = require('express');
const router = express.Router();

// User authentication
const {
  Services,
  Middleware,
  Extensions
} = require('sirexjs');

module.exports = (function () {

  router.get('/', [Middleware.auth], async (req, res) => {
    try {
      const list = await Services.tasks.manager('index')
        .init()
        .list();

      res.restResponse(list);
    } catch (e) {
      Extensions.logger.error(e);
      res.restResponse(e);
    }
  });

  router.post('/', [Middleware.auth], async (req, res) => {
    try {
      const created = await Services.tasks.manager('index')
        .init()
        .create(req.body);

      res.restResponse(created);
    } catch (e) {
      Extensions.logger.error(e);
      res.restResponse(e);
    }
  });

  router.get('/:taskId', [Middleware.auth], async (req, res) => {
    try {
      const getTask = await Services.tasks.manager('index')
        .init()
        .get(req.params.taskId);

      res.restResponse(getTask);
    } catch (e) {
      Extensions.logger.error(e);
      res.restResponse(e);
    }
  });

  router.put('/:taskId', [Middleware.auth], async (req, res) => {
    try {
      const updated = await Services.tasks.manager('index')
        .init()
        .update(req.params.taskId, req.body);

      res.restResponse(updated);
    } catch (e) {
      Extensions.logger.error(e);
      res.restResponse(e);
    }
  });

  router.delete('/:taskId', [Middleware.auth], async (req, res) => {
    try {
      const deleted = await Services.tasks.manager('index')
        .init()
        .delete(req.params.taskId);

      res.restResponse(deleted);
    } catch (e) {
      Extensions.logger.error(e);
      res.restResponse(e);
    }
  });

  router.use('*', (req, res) => {
    res.status(404).send('Resource for "tasks" service not found.');
  });

  return router;
})();