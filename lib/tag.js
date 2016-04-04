"use strict";
module.exports = function(file, options){
  if(options.save){
    var tag = options.save || "default";
    console.log('saving %s to <%s> tag', file, tag);
  }else{
    console.log('saving %s to .gitignore', file);
  }
};
