module.exports = function(n, cb){
  if(n === 0) cb();
  var i = 0;

  var done = function(){
    if(++i === n) cb();
  };

  done.isLast = function(){
    return i === n-1;
  };

  return done;
};
