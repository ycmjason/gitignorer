var fs = require('fs');

var request = require('request');

var $HOME = require('./HOME');
var wait = require('./wait');
var processIgnoredFiles = require('./processIgnoredFiles');

var gitignore_profiles = {};
var gitignore_profiles_path = $HOME + '/.gitignore.profiles.js';
try{
  gitignore_profiles = require(gitignore_profiles_path, 'utf-8');
}catch(e){
  if(e.code === "MODULE_NOT_FOUND"){
    console.warn("Warning: can't find profiles '" + gitignore_profiles_path + "'.\n");
  }else throw e;
}

gitignore_profiles['default'] = gitignore_profiles['default'] || [];

function fetch(url, cb){
  request(url, function(err, res, body){
    if(err) throw err;
    cb(body);
  });
}

module.exports = {
  getProfileNames: function(){
    return Object.keys(gitignore_profiles);
  },
  getProfile: function(name, cb){
    var isUrl = s => s.substring(0, 5) === "url: ";
    var urls = gitignore_profiles[name].filter(isUrl).map(url => url.substring(5));
    var files = gitignore_profiles[name].filter(file => !isUrl(file));

    var done = wait(urls.length, () => cb(processIgnoredFiles(files)));
    urls.forEach(url => {
        fetch(url, function(body){
          body.split('\n').forEach(f => files.push(f));
          done();
        });
    });
  }
}
