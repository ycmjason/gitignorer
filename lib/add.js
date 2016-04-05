"use strict";
var fs = require('fs'),
    generate_msg = require('msg-generator'),
    message = require('simple-message');

var profiles = require('filesys-db')().getCollection('profiles');

function processIgnoredFiles(files){
  return files.map((file) => file.trim()) // trim white spaces
              .filter((file) => file != '') // remove empty arr
              .sort()
              .filter((file, i, ary) => (!i || file != ary[i - 1])); // remove duplicates

}

function addToProfile(name, files){
  profiles.update({name: name}, (profile) => {
    profile.ignored_files = processIgnoredFiles(profile.ignored_files.concat(files));
  }, (profiles) => {
    if(profiles.length <= 0){
      return console.error(
        message.error.get('options.invalid.profile').message
      );
    }

    var profile = profiles[0];
    console.log(generate_msg('success') + '\n');
    console.log(name + " profile:");
    console.log(profile.ignored_files.join('\n'));
  });
}

function addToGitignore(newfiles){
  // first obtain the current list of gitignores
  fs.readFile('.gitignore', 'utf-8', (err, data) => {
    var files = data.split("\n").concat(newfiles);
    files = processIgnoredFiles(files);
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
