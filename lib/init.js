'use strict';
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    message = require('simple-message');

var profiles = require('filesys-db')().getCollection('profiles');

function createGitignore(profile){
  if(!profile){
    return console.error(
      message.error.get('options.invalid.profile').message
    );
  }
  // comment the gitignore
  var file_content = `# created by gitignorer
# profile used: ' + profile.name`;

  // add the to be ignored files in profile
  file_content += profile.ignored_files.toString().replace(/,/g, '\n') + '\n';

  // console.log(file_content);
  fs.writeFile('.gitignore', file_content, (err) => {
    if(err) throw err;
    console.log(generate_msg('success') + '\n\n > cat .gitignore');
    console.log(file_content);
  });
}

module.exports = function(profile_name, options){
  profiles.findOne({name: profile_name || 'default'}, createGitignore);
};
