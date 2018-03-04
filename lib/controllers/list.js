"use strict";
/*
const fs      = require('fs');
const messages = require('../messages');

function listGitignore(){
  const gitignoreContent;
  try{
    gitignoreContent = fs.readFileSync('.gitignore', 'utf-8');
    return gitignoreContent.replace(/\n$/, '');
  }catch(err){
    if(err && err.code == 'ENOENT') console.error(messages.error['options.missing.gitignore']);
    else throw err;
  }
}


module.exports = function(options){
  const out = listGitignore();
  if(out) console.log(out);
};
*/
