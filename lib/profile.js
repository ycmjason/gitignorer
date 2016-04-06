"use strict";
var profiles = require('filesys-db')().getCollection('profiles');

var messages = require('./messages');

var generate_msg = require('msg-generator');

function create(profile_name, callback){
  profiles.put({name: profile_name, ignored_files: []}, () => {
    callback(generate_msg('success') + "\nDo `gitignorer add -p "+profile_name+" <files...>` to add files to it");
  });
}

function del(profile_name, callback){
  if(profile_name == 'default') return callback('You should not really attempt to delete the default profile');

  profiles.remove({name: profile_name}, (profiles) => {
    var profile = profiles[0];
    callback(`Profile deleted.\n
Just in case you unintentionally deleted this, run the following commands to get it back:
gitignorer profile -a ` + profile.name + `
gitignorer add -p ` + profile.name + ` ` + profile.ignored_files.join(' '));
  });
}

function copy(from, to, callback){
  profiles.findOne({name: from}, (pfrom) => {
    if(!pfrom) return callback(messages.error.get('options.invalid.profile'));
    profiles.put({name: to, ignored_files: pfrom.ignored_files}, () => {
      callback(generate_msg('success') + "\n" + to + ":\n" + pfrom.ignored_files.join('\n'));
    });
  });
}

function move(from, to, callback){
  profiles.update({name:from}, {name:to}, (ps) => {
    if(ps.length = 0) return callback(messages.error.get('options.invalid.profile'));
    callback(generate_msg('success') + "\n" + from + "->" + to);
  });
}

function list(cb){
  profiles.find({}, (ps) => {
    cb(ps.map((p)=>p.name).join('\n'));
  });
}

module.exports = function(name, options, cb){
  if(!cb) cb = console.log;

  if(!name || options.list){
    list(cb);
  }else if(options.create){
    create(name, cb);
  }else if(options.delete){
    del(name, cb);
  }else if(options.copy){
    copy(name, options.copy, cb);
  }else if(options.move){
    move(name, options.move, cb);
  }
};
