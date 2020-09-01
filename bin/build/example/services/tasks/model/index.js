'use strict';

const {
  Databases
} = require('sirexjs');

// You can extend any database class here

module.exports = class TasksModel extends Databases.inMemory {

  get collectionName() {
    return 'tasks';
  }

  createItem(data) {
    return this.collection.create(data);
  }

  updateItem(id, data) {
    return this.collection.findIdUpdate(id, data);
  }

  getAllItems() {
    return this.collection.find();
  }

  getItem(id) {
    return this.collection.findId(id);
  }

  removeItem(id) {
    return this.collection.delete(id);
  }
};
