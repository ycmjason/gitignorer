'use strict';
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('../messages');

var profiles = require('../profiles');

function createGitignore(name, files, force){
  // comment the gitignore
  var file_content = `# created by gitignorer
# profile used: ` + name + `\n`;

  // add the to be ignored files in profile
  file_content += files.join('\n') + '\n';

  if(!force && fs.existsSync('.gitignore')){
    console.error('.gitignore already exists. add -f to overwrite it.');
  }else{
    fs.writeFileSync('.gitignore', file_content);
    var msg = generate_msg('success') + '\n\n > cat .gitignore\n';
    msg += file_content.replace(/\n$/, '');
    return msg;
  }
}

module.exports = function(profile_name, options){
  profile_name = profile_name || 'default';
  var files = profiles.getProfile(profile_name);

  if(files === undefined){
    console.error(messages.error['options.invalid.profile']);
  }

  var out = createGitignore(profile_name, files, options.force);
  if(out) console.log(out);
};
