'use strict';
//Ever feel irritating when you have to create a .gitignore file with the exact same setting over and over again when you start a new project? 
var program = require('commander');

var handlers = require('./lib/handlers'); 

program
  .version(require('./package.json').version);

program
  .command('init [profile]')
  .description('Create .gitignore at current directory')
  .action(handlers.init);
 
program
  .command('add <files...>')
  .description('Add file(s) to .gitignore')
  .option('-t, --profile [profile]', 'add file to profile instead of .gitignore')
  .action(handlers.add);

program
  .command('remove <files...>')
  .alias('rm')
  .description('Remove ignored file from .gitignore or [profile]')
  .option('-t, --profile [profile]', 'which profile to list')
  .action(handlers.remove);
 
program
  .command('list')
  .alias('ls')
  .description('List ignored file in .gitignore or [profile]')
  .option('-t, --profile [profile]', 'which profile to list')
  .action(handlers.list);

program
  .command('profile <name>')
  .description('Perform operation on profile base on [options]')
  .option('-a, --add', 'create a profile')
  .option('-d, --delete', 'delete a profile')
  .option('-cp, --copy <destination>', 'copy a profile to <destination> with all the settings copied')
  .option('-mv, --rename <destination>', 'rename a profile with all the settings remain')
  .action(handlers.profile);

program.parse(process.argv);
