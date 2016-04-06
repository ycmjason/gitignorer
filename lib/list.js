"use strict";
var fs      = require('fs'),
    messages = require('./messages');

var profiles = require('filesys-db')().getCollection('profiles');

function listGitignore(cb){
  fs.readFile('.gitignore', 'utf-8', (err, content) => {
    if(err && err.code == 'ENOENT') return cb(messages.error.get('options.missing.gitignore').message);
    cb(content.replace(/\n$/, ''));
  });
}

function listProfile(profile, cb){
  profiles.findOne({name: profile}, (p) => {
    if(!p) return cb(messages.error.get('options.invalid.profile').message);
    cb(p.ignored_files.join('\n'));
  });
}

module.exports = function(options, cb){
  if(!cb) cb = console.log;
  if(options.profile){
    listProfile(options.profile, cb);
  }else{
    listGitignore(cb);
  }
};
