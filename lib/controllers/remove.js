"use strict";
/*
const fs = require('fs');
const generate_msg = require('msg-generator');
const messages = require('../messages');

const processIgnoredFiles = require('../processIgnoredFiles');

function removeFiles(from, files_to_be_removed){
  return from.filter((file) => files_to_be_removed.indexOf(file) < 0);
}

function removeFromGitignore(files_to_be_removed){
  // first obtain the current list of gitignores
  try{
    const old_files = fs.readFileSync('.gitignore', 'utf-8').split("\n");
    const updated_files = removeFiles(old_files, files_to_be_removed);
    updated_files = processIgnoredFiles(updated_files);
    fs.writeFileSync('.gitignore', updated_files.join('\n') + '\n');
    return generate_msg('success') + "\n\n > cat .gitignore\n" + updated_files.join('\n');
  }catch(err){
    console.error(generate_msg('failure'));
    throw err;
  };
}

module.exports = function(files){
  const out = removeFromGitignore(files);
  if(out) console.log(out);
};
*/
