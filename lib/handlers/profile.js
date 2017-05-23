"use strict";
var profiles = require('../profiles');

var messages = require('../messages');

var generate_msg = require('msg-generator');

function list(){
  var list_files = (files) => files.map(file => `  ${file}`).join('\n');
  var list_profile = (name) => `${name}:\n` + list_files(profiles.getProfile(name));
  var profiles_listed = profiles.getProfileNames().map(list_profile).join('\n\n');
  return profiles_listed;
}

module.exports = function(options, cb){
  var out = list();
  if(out) console.log(out);
};
