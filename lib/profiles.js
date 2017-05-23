var fs = require('fs');
var $HOME = require('./HOME');

var gitignore_profiles;
var gitignore_profiles_path = $HOME + '/.gitignore.profiles.js';
try{
  gitignore_profiles = require(gitignore_profiles_path, 'utf-8');
}catch(e){
  if(e.code === "MODULE_NOT_FOUND"){
    console.warn("Warning: can't find profiles '" + gitignore_profiles_path + "'.\n");
    gitignore_profiles = {default: []};
  }else throw e;
}

module.exports = {
  getProfileNames: function(){
    return Object.keys(gitignore_profiles);
  },
  getProfile: function(name){
    return gitignore_profiles[name];
  }
}
