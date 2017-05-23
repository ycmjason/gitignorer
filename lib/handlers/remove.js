"use strict";
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    messages = require('../messages');

var processIgnoredFiles = require('../processIgnoredFiles');

function removeFiles(from, files_to_be_removed){
  return from.filter((file) => files_to_be_removed.indexOf(file) < 0);
}

function removeFromGitignore(files_to_be_removed){
  // first obtain the current list of gitignores
  try{
    var old_files = fs.readFileSync('.gitignore', 'utf-8').split("\n");
    var updated_files = removeFiles(old_files, files_to_be_removed);
    updated_files = processIgnoredFiles(updated_files);
    fs.writeFileSync('.gitignore', updated_files.join('\n') + '\n');
    return generate_msg('success') + "\n\n > cat .gitignore\n" + updated_files.join('\n');
  }catch(err){
    console.error(generate_msg('failure'));
    throw err;
  };
}

module.exports = function(files){
  var out = removeFromGitignore(files);
  if(out) console.log(out);
};
