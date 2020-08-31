"use strict";

const fs = require('fs');
const path = require("path");
const term = require('terminal-kit').terminal;
// const packageFile = require('./packageFile.js');
const databaseData = require('../databaseData');
const helpers = require('../helpers');

module.exports = () => {

  let projectFolder = process.cwd();

  let databaseFolder = `${projectFolder}/src/databases/${databaseData.database_name}`;

  if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder);
  } else {
    term.red(`\n\n"${databaseData.database_name}" Folder already exists!\n\n`);
    process.exit();
    return false;
  }

  fs.writeFileSync(`${databaseFolder}/index.js`,
    `'use strict';

const {
  Services
} = require('sirexjs');

/** 
 * Extend this Class with your prefered database
 * Ex. class ${helpers.capitalized(databaseData.database_name)}Database extends myDB {
 * 
*/

module.exports = class ${helpers.capitalized(databaseData.database_name)}Database {
  
  constructor() {}

};
`);

  process.exit();
};