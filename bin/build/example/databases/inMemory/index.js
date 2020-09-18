'use strict';

const moment = require('moment');

let database = {};

/**
 *This is a mock test in memory database
 * This is just an example of how the Databases work
 *
 * @class InMemory
 */
class InMemory {

  static create(data) {
    let recordKey = moment().format('x');
    data.id = recordKey;
    database[recordKey] = data;

    return database[recordKey];
  }

  static find() {
    return Object.values(database);
  }

  static findId(id) {
    if (typeof database[id] === 'undefined') return null;

    return database[id];
  }

  static findIdUpdate(id, data) {
    if (typeof database[id] === 'undefined') return null;

    return database[id] = Object.assign(database[id], data);
  }

  static delete(id) {
    delete database[id];

    return {
      delete: true
    };
  }
}

/** 
 * Extend this Class with your prefered database
 * Ex. class InMemoryDatabase extends myDB {
 * 
 */

module.exports = class InMemoryDatabase extends InMemory {

  static loadDB() {
    return new Promise((resolve) => {

      console.log(`
      ----- InMemoryDB start in 1000ms -----
      `);

      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
};
