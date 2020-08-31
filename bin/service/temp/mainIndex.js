'use strict';

const {
  Server,
  Databases
} = require('sirexjs');

Server.load({
  beforeLoad: async () => {
    // Before anything is loaded, even environment variables
  },
  beforeCreate: async (app) => {
    // Callback has access to nodejs instance via "app"
    // Example DB return promise
    return await Databases.inMemory.loadDB();
  },
  created: async (app) => {
    // Callback has access to nodejs instance via "app"
  }
});
