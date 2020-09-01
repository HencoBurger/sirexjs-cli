#! /usr/bin/env node

"use strict";

const term = require('terminal-kit').terminal;
const initProject = require('./initProject');
const createService = require('./createService');
const createDatabase = require('./createDatabase');
const createMiddleware = require('./createMiddleware');
const createThread = require('./createThread');

function terminate() {
  term.grabInput( false ) ;
  setTimeout( function() {
    term.clear();
    process.exit();
  } , 100 ) ;
}

module.exports = (() => {
  term.on( 'key' , function( name , matches , data ) {
  	if ( name === 'CTRL_C' ) { terminate() ; }
  } ) ;

  term(`
    \n\n\n\n
 ######  #### ########  ######## ##     ##       ##  ######
##    ##  ##  ##     ## ##        ##   ##        ## ##    ##
##        ##  ##     ## ##         ## ##         ## ##
 ######   ##  ########  ######      ###          ##  ######
      ##  ##  ##   ##   ##         ## ##   ##    ##       ##
##    ##  ##  ##    ##  ##        ##   ##  ##    ## ##    ##
 ######  #### ##     ## ######## ##     ##  ######   ######
`);

  term.cyan(`\n
  Service layer architecture for Express.js
  Follow the prompts to setup your new project.
  \n
`);

  var items = [
    `init         Create new project.`,
    `service      Create new service.`,
    `database     Create a connection to your preferred database.`,
    `middleware   Create new middleware.`,
    `thread       Create new Service Child Process.`
  ];

  term.singleColumnMenu(items, async function(error, response) {
    switch (response.selectedIndex) {
    case 0:
      initProject();
      break;
    case 1:
      createService();
      break;
    case 2:
      createDatabase();
      break;
    case 3:
      createMiddleware();
      break;
    case 4:
      createThread();
      break;
    }
  });
})();
