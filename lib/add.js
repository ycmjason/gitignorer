"use strict";
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('./messages');

var profiles = require('filesys-db')().getCollection('profiles');

var processIgnoredFiles = require('./processIgnoredFiles');

function addToProfile(name, files, cb){
  profiles.update({name: name}, (profile) => {
    profile.ignored_files = processIgnoredFiles(profile.ignored_files.concat(files));
  }, (profiles) => {
    if(profiles.length <= 0) return cb(messages.error.get('options.invalid.profile').message);

    var profile = profiles[0];
    var msg = generate_msg('success') + '\n';
    msg += name + " profile:";
    msg += profile.ignored_files.join('\n');
    cb(msg);
  });
}

function addToGitignore(newfiles, cb){
  // first obtain the current list of gitignores
  fs.readFile('.gitignore', 'utf-8', (err, data) => {
    if(err) data = '';
    var files = data.split("\n").concat(newfiles);
    files = processIgnoredFiles(files);
    fs.writeFile('.gitignore', files.join('\n')+'\n', (err) => {
      if(err) throw err;
      var msg = generate_msg('success') + "\n\n > cat .gitignore";
      msg += files.join('\n');
      cb(msg);
    });
  });
}

module.exports = function(files, options, callback){
  callback = callback || console.log;
  if(options && options.profile){
    addToProfile(options.profile, files, this.callback);
  }else{
    addToGitignore(files, callback);
  }
};
