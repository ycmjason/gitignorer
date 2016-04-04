"use strict";
var db = require('filesys-db')();

module.exports = function(cmd, options){
  console.log('exec "%s" using %s mode', cmd, options.exec_mode);
};
