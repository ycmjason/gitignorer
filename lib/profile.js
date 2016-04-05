"use strict";
var db = require('filesys-db')();

module.exports = function(file, options){
  if(options.save){
    var profile = options.save || "default";
    console.log('saving %s to <%s> profile', file, profile);
  }else{
    console.log('saving %s to .gitignore', file);
  }
};
