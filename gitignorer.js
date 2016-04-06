#!/usr/bin/env node
'use strict';
//Ever feel irritating when you have to create a .gitignore file with the exact same setting over and over again when you start a new project? 

/* note on filesys-db schema:
 * profiles (collection)
 *   |- name
 *   |- ignored_files
 */

var program = require('commander');

var handlers = require('./lib/handlers'); 

var db = require('filesys-db')();
var profiles = db.getCollection('profiles');

if(profiles==null){
  profiles = db.createCollection('profiles');
  profiles.put({name: 'default', ignored_files: []}, main);
}else{
  main();
}

function main(){
  program
    .version(require('./package.json').version);

  program
    .command('init [profile]')
    .description('Create .gitignore at current directory')
    .option('-f, --force', 'overwrite the existing .gitignore')
    .action(handlers.init);
   
  program
    .command('add <files...>')
    .description('Add file(s) to .gitignore')
    .option('-p, --profile [profile]', 'add file to profile instead of .gitignore')
    .action(handlers.add);

  program
    .command('remove <files...>')
    .alias('rm')
    .description('Remove ignored file from .gitignore or [profile]')
    .option('-p, --profile [profile]', 'which profile to list')
    .action(handlers.remove);
   
  program
    .command('list')
    .alias('ls')
    .description('List ignored file in .gitignore or [profile]')
    .option('-p, --profile [profile]', 'which profile to list')
    .action(handlers.list);

  program
    .command('profile <name>')
    .description('Perform operation on profile base on [options]')
    .option('-c, --create', 'create a profile')
    .option('-d, --delete', 'delete a profile')
    .option('-cp, --copy <destination>', 'copy a profile to <destination> with all the settings copied')
    .option('-mv, --rename <destination>', 'rename a profile with all the settings remain')
    .action(handlers.profile);

  program.parse(process.argv);
}
