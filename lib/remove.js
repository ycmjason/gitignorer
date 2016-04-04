"use strict";
module.exports = function(file, options){
  if(options.save){
    var tag = options.save || "default";
    console.log('removing %s from <%s> tag', file, tag);
  }else{
    console.log('removing %s from .gitignore', file);
  }
};
