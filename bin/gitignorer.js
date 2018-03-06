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
  .command('profiles')
  .description('List all profiles and their corresponding files')
  .action(controllers.profiles);

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
