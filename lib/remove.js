"use strict";
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('./messages');

var profiles = require('filesys-db')().getCollection('profiles');

var processIgnoredFiles = require('./processIgnoredFiles');

function removeFiles(from, files_to_be_removed){
  return from.filter((file) => {
    return files_to_be_removed.indexOf(file) < 0;
  });
}

function removeFromProfile(name, files_to_be_removed, cb){
  profiles.update({name: name}, (profile) => {
    profile.ignored_files = processIgnoredFiles(removeFiles(profile.ignored_files));
  }, (profiles) => {
    if(profiles.length <= 0) return cb(messages.error.get('options.invalid.profile').message);

    var profile = profiles[0];
    var msg = generate_msg('success') + '\n';
    msg += name + " profile:";
    msg += profile.ignored_files.join('\n');

    cb(msg);
  });
}

function removeFromGitignore(newfiles, cb){
  // first obtain the current list of gitignores
  fs.readFile('.gitignore', 'utf-8', (err, data) => {
    if(err && err) cb(generate_msg('success'));
    var files = removeFiles(data.split("\n"), newfiles);
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
    removeFromProfile(options.profile, files, callback);
  }else{
    removeFromGitignore(files, callback);
  }
};
