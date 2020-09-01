'use strict';

const {
  Services,
  Databases,
  Extensions
} = require('sirexjs');

// createFile Thread function
module.exports = async (payload) => {
  var fs = require('fs');

  // Access to services
  const multiplied = await Services.tasks.manager('index')
    .init()
    .multiplier(payload.multiplier);

  let textToSave = '';
  
  for (let i = 0; i <= multiplied; i++) {
    textToSave += 'some text here \n';
  }

  // File is saved
  fs.writeFile('savedFile.txt', textToSave, function (err) {
    if (err) throw err;
    
    return {
      response: 'File saved!'
    };
  });
};