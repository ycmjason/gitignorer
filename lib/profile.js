"use strict";
var profiles = require('filesys-db')().getCollection('profiles');

var messages = require('./messages');

function create(profile_name, callback){
  profiles.put({name: profile_name, ignored_files: []}, () => {
    callback("Profile created. Do `gitignorer add -p "+profile_name+" <files...>` to add files to it");
  });
}

function del(profile_name, callback){
  profiles.remove({name: profile_name}, (profile) => {
    callback(`Profile deleted.\n
Just in case you unintentionally deleted this, run the following commands to get it back:
gitignorer profile -a ` + profile_name + `
gitignorer add -p ` + profile_name + ` ` + profile.ignored_files.join(' '));
  });
}

module.exports = function(name, options, cb){
  if(!cb) cb = console.log;
  if(options.create){
    create(name, cb);
  }else if(options.delete){
    del(name, cb);
  }
};
