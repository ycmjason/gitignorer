#!/usr/bin/env node
'use strict';
//Ever feel irritating when you have to create a .gitignore file with the exact same setting over and over again when you start a new project? 

var program = require('commander');

var handlers = require('./lib/handlers'); 

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
  .action(handlers.add);

program
  .command('remove <files...>')
  .alias('rm')
  .description('Remove ignored file from .gitignore')
  .action(handlers.remove);
 
program
  .command('list')
  .alias('ls')
  .description('List ignored file in .gitignore')
  .action(handlers.list);

program
  .command('profiles')
  .alias('profile')
  .description('List all profiles and their corresponding files')
  .action(handlers.profile);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
