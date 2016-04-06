'use strict';
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('./messages');

var profiles = require('filesys-db')().getCollection('profiles');

function writeToGitignore(file_content, cb){
  fs.writeFile('.gitignore', file_content, (err) => {
    if(err) throw err;
    var msg = generate_msg('success') + '\n\n > cat .gitignore\n';
    msg += file_content.replace(/\n$/, '');

    cb(msg);
  });
}

function createGitignore(profile, force, cb){
  if(!profile) return cb(messages.error.get('options.invalid.profile').message);

  // comment the gitignore
  var file_content = `# created by gitignorer
# profile used: ` + profile.name + `\n`;

  // add the to be ignored files in profile
  file_content += profile.ignored_files.join('\n') + '\n';

  fs.stat('.gitignore', (err, status) => {
    if(!force && !err) return cb(".gitignore already exists. add -f to overwrite it.");
    writeToGitignore(file_content, cb);
  });
}

module.exports = function(profile_name, options, callback){
  callback = callback || console.log;
  profiles.findOne({name: profile_name || 'default'}, (p) => {
    createGitignore(p, options.force, callback);
  });
};
