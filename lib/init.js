'use strict';
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    message = require('simple-message');

var profiles = require('filesys-db')().getCollection('profiles');

function createGitignore(profile, cb){
  if(!profile) throw message.error.get('options.invalid.profile').message;

  // comment the gitignore
  var file_content = `# created by gitignorer
# profile used: ' + profile.name` + '\n';

  // add the to be ignored files in profile
  file_content += profile.ignored_files.join('\n') + '\n';

  fs.writeFile('.gitignore', file_content, (err) => {
    if(err) throw err;
    var msg = generate_msg('success') + '\n\n > cat .gitignore';
    msg += file_content.replace(/\n$/, '');

    cb(msg);
  });
}

module.exports = function(profile_name, options, callback){
  callback = callback || console.log;
  profiles.findOne({name: profile_name || 'default'}, (p) => {
    createGitignore(p, callback);
  });
};
