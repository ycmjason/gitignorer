"use strict";
var profiles = require('../profiles');

var messages = require('../messages');
var wait = require('../wait');

var generate_msg = require('msg-generator');

function list(cb){
  var out = '';
  var profileNames = profiles.getProfileNames();

  var done = wait(profileNames.length, () => cb(out));

  profiles.getProfileNames().forEach(name => {
    profiles.getProfile(name, files => {
      var list_files = (files) => files.map(file => `  ${file}`).join('\n');
      out += `${name}:\n` + list_files(files);
      if(!done.isLast()) out += '\n\n';
      done();
    });
  });
}

module.exports = function(options, cb){
  list(console.log.bind(console));
};
