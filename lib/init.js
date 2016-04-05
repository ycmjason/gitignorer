"use strict";
var db = require('filesys-db')();

module.exports = function(file, options){
  if(options.save){
    var profile = options.save || "default";
    console.log('removing %s from <%s> profile', file, profile);
  }else{
    console.log('removing %s from .gitignore', file);
  }
};
