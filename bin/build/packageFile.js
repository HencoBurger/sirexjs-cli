"use strict";

const fs = require('fs');
const path = require("path");
const shell = require('shelljs');
const term = require('terminal-kit').terminal;

module.exports = async (options) => {
  try {
    let defaultInitFile =
`{
  "name": "${options.project_name}",
  "version": "${options.version}",
  "description": "${options.description}",
  "main": "index.js",
  "scripts": {
    "lint": "eslint --fix src/",
    "test": "mocha",
    "dev": "nodemon index.js --watch src/ --ignore node_modules/",
    "start": "node index.js"
  },
  "author": "${options.author}",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {}
}`;

    let projectFolder = process.cwd();

    if(options.create_project_folder) {
      projectFolder = options.project_folder_name;
      if(!fs.existsSync(projectFolder)) {
        fs.mkdirSync(`${projectFolder}`);
      } else {
        term.red(`\n\n"${projectFolder}" Folder already exists!\n\n`);
        process.exit();
        return false;
      }
    }

    fs.writeFileSync(`${projectFolder}/README.md`, `# ${options.project_name}
${options.description}
`);

    fs.writeFileSync(`${projectFolder}/.eslintrc.json`, `{
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": ["error", "always"],
        "indent": ["error", 2]
    }
}
`);

    fs.writeFileSync(`${projectFolder}/.env`,
      `# Environment variables go here.
APP_NAME=${options.project_name}
NODE_ENV=dev
APP_PORT=3000
`);

    fs.writeFileSync(`${projectFolder}/.gitignore`,
      `/node_modules
.env
`);



    let mainIndex = fs.readFileSync(path.resolve(__dirname, "../service/temp/mainIndex.js"));
    fs.writeFileSync(`${projectFolder}/index.js`, mainIndex);

    fs.writeFileSync(`${projectFolder}/package.json`, defaultInitFile);

    fs.mkdirSync(`${projectFolder}/src`);
    fs.writeFileSync(`${projectFolder}/src/README.md`, 'This is where all your code goes.');

    fs.mkdirSync(`${projectFolder}/src/middleware`);
    fs.writeFileSync(`${projectFolder}/src/middleware/README.md`, 'Expressjs middleware goes here.');
    
    fs.mkdirSync(`${projectFolder}/src/databases`);
    fs.writeFileSync(`${projectFolder}/src/databases/README.md`, 'Any database implementations go here, put every database connection in its own folder.');

    fs.mkdirSync(`${projectFolder}/src/router`);
    let routeIndex = fs.readFileSync(path.resolve(__dirname, "../service/temp/routeIndex.js"));
    fs.writeFileSync(`${projectFolder}/src/router/index.js`, routeIndex);
    fs.writeFileSync(`${projectFolder}/src/router/README.md`, 'Main entry to your API end-points.');

    fs.mkdirSync(`${projectFolder}/src/services`);
    fs.writeFileSync(`${projectFolder}/src/services/README.md`, 'Home of all your created services.');

    fs.mkdirSync(`${projectFolder}/src/utilities`);
    fs.writeFileSync(`${projectFolder}/src/utilities/README.md`, `Place code here that doesn't really belong under a service, things like payment platform SDK or transactional email provider.
      `);

    fs.mkdirSync(`${projectFolder}/test`);
    fs.writeFileSync(`${projectFolder}/test/README.md`, 'Put all the tests for your code here.');

    if(process.cwd() !== projectFolder) {
      shell.cd(projectFolder);
    }

    let dependencies = [
      'app-module-path',
      'body-parser',
      'cors',
      'dotenv',
      'express',
      'express-fileupload',
      'moment',
      'winston',
      'sirexjs'
    ];

    let devDependencies = [
      'chai',
      'eslint',
      'mocha',
      'nodemon'
    ];

    for (let key in dependencies) {
      shell.exec(`npm i ${dependencies[key]}`);
    }

    for (let key in devDependencies) {
      shell.exec(`npm i ${devDependencies[key]} --save-dev`);
    }

    shell.exec('npm shrinkwrap');

    term.green(`\n\nSetup and ready to go...`);
  } catch(e) {
    console.error(e);
  }
};
