'use strict';

const {
  Services
} = require('sirexjs');

module.exports = class tasksManager {
  static init() {
    return new this();
  }

  async list() {
    let allTasks = await Services.tasks.model.getAllItems();
    return allTasks;
  }

  async create(data) {
    let createdItem = await Services.tasks.model.createItem(data);
    return createdItem;
  }

  async get(taskId) {
    let updatedItem = await Services.tasks.model.getItem(taskId);
    return updatedItem;
  }

  async update(taskId, data) {
    let updatedItem = await Services.tasks.model.updateItem(taskId, data);
    return updatedItem;
  }

  async delete(taskId) {
    let updatedItem = await Services.tasks.model.removeItem(taskId);
    return updatedItem;
  }

  async export() {
    
    Services.tasks.thread('createFile', {
      'multiplier': 100
    });

    return {
      exporting: true
    };
  }

  multiplier(multiplier) {
    return 5000 * multiplier;
  }
};