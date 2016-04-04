'use strict';
//Ever feel irritating when you have to create a .gitignore file with the exact same setting over and over again when you start a new project? 
var program = require('commander');

var handlers = require('./lib/handlers'); 

program
  .version(require('./package.json').version)
 
program
  .command('add <files...>')
  .description('Add file(s) to .gitignore')
  .option('-t, --tag [tag]', 'add file to tag instead of .gitignore')
  .action(handlers.ignore);

program
  .command('remove <files...>')
  .alias('rm')
  .description('Remove ignored file from .gitignore or [tag]')
  .option('-t, --tag [tag]', 'which tag to list')
  .action(handlers.remove);
 
program
  .command('list')
  .alias('ls')
  .description('List ignored file in .gitignore or [tag]')
  .option('-t, --tag [tag]', 'which tag to list')
  .action(handlers.list);

program
  .command('tag <name>')
  .description('Perform operation on tag base on [options]')
  .option('-a, --add', 'create a tag')
  .option('-d, --delete', 'delete a tag')
  .option('-cp, --copy <destination>', 'copy a tag to <destination> with all the settings copied')
  .option('-mv, --rename <destination>', 'rename a tag with all the settings remain')
  .action(handlers.tag);

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
  console.log(program.help());
  process.exit(1);
}
