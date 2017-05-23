"use strict";
var fs      = require('fs'),
    messages = require('../messages');

function listGitignore(){
  var gitignoreContent;
  try{
    gitignoreContent = fs.readFileSync('.gitignore', 'utf-8');
    return gitignoreContent.replace(/\n$/, '');
  }catch(err){
    if(err && err.code == 'ENOENT') console.error(messages.error['options.missing.gitignore']);
    else throw err;
  }
}


module.exports = function(options){
  var out = listGitignore();
  if(out) console.log(out);
};
