"use strict";
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('../messages');

var processIgnoredFiles = require('../processIgnoredFiles');

function addFiles(from, files_to_be_addd){
  return from.concat(files_to_be_addd);
}

function addFromGitignore(files_to_be_addd){
  // first obtain the current list of gitignores
  try{
    var old_files = fs.readFileSync('.gitignore', 'utf-8').split("\n");
    var updated_files = addFiles(old_files, files_to_be_addd);
    updated_files = processIgnoredFiles(updated_files);
    fs.writeFileSync('.gitignore', updated_files.join('\n') + '\n');
    return generate_msg('success') + "\n\n > cat .gitignore\n" + updated_files.join('\n');
  }catch(err){
    console.error(generate_msg('failure'));
    throw err;
  };
}

module.exports = function(files){
  var out = addFromGitignore(files);
  if(out) console.log(out);
};
