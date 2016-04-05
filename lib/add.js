"use strict";
var fs = require('fs');

var profiles = require('filesys-db')().getCollection('profiles');

function addToProfile(name, files){
  profiles.update({name: name}, (profile) => {
    profile.ignore_files = profile.ignore_files.concat(files);
  }, (profiles) => {
    if(profiles.length <= 0) return console.error("no profile named, " + name + ", found");
    var profile = profiles[0];
    console.log("Great success!"+
                "Profile [" + name + "]:");
    console.log(profiles.files.join('\n'));
  });
}

function addToGitignore(newfiles){
  // first obtain the current list of gitignores
  fs.readFile('.gitignore', 'utf-8', (err, data) => {
    var files = data.split("\n").concat(newfiles);
    var files =  files.map((file) => file.trim()) // trim white spaces
                      .filter((file) => file != '') // remove empty files
                      .sort().filter((file, i, ary) =>  (!i || file != ary[i - 1])); // remove duplicates
    fs.writeFile('.gitignore', files.join('\n')+'\n', (err) => {
      if(err) throw err;
      console.log("Successful! Just like your life!\n\n > cat .gitignore");
      console.log(files.join('\n'));
    });
  });
}

module.exports = function(files, options){
  if(options.profile){
    addToProfile(options.profile, files);
  }else{
    addToGitignore(files);
  }
};
