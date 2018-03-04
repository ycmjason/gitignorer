"use strict";
/*
const profiles = require('../profiles');

const messages = require('../messages');
const wait = require('../wait');

const generate_msg = require('msg-generator');

function list(cb){
  const out = '';
  const profileNames = profiles.getProfileNames();

  const done = wait(profileNames.length, () => cb(out));

  profiles.getProfileNames().forEach(name => {
    profiles.getProfile(name, files => {
      const list_files = (files) => files.map(file => `  ${file}`).join('\n');
      out += `${name}:\n` + list_files(files);
      if(!done.isLast()) out += '\n\n';
      done();
    });
  });
}

module.exports = function(options, cb){
  list(console.log.bind(console));
};
*/
