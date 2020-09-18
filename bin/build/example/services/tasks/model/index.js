'use strict';

const {
  Databases
} = require('sirexjs');

// You can extend any database class here

module.exports = class TasksModel extends Databases.inMemory {

  get collectionName() {
    return 'tasks';
  }

  static createItem(data) {
    return TasksModel.create(data);
  }

  static updateItem(id, data) {
    return TasksModel.findIdUpdate(id, data);
  }

  static getAllItems() {
    return TasksModel.find();
  }

  static getItem(id) {
    return TasksModel.findId(id);
  }

  static removeItem(id) {
    return TasksModel.delete(id);
  }
};
