#!/usr/bin/env node
const program = require('commander');

const controllers = require('../lib/controllers'); 

program
  .version(require('../package.json').version);

program
  .command('init [profile]')
  .description('Create .gitignore at current directory')
  .option('-f, --force', 'overwrite the existing .gitignore')
  .action(controllers.init);
 
program
  .command('add <files...>')
  .description('Add file(s) to .gitignore')
  .action(controllers.add);

program
  .command('remove <files...>')
  .alias('rm')
  .description('Remove ignored file from .gitignore')
  .action(controllers.remove);
 
program
  .command('list')
  .alias('ls')
  .description('List ignored file in .gitignore')
  .action(controllers.list);

program
  .command('profiles')
  .alias('profile')
  .description('List all profiles and their corresponding files')
  .action(controllers.profile);

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
