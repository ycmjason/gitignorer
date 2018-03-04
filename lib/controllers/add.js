const { EOL } = require('os');
const { readFileSync, writeFileSync } = require('fs');

const generate_msg = require('msg-generator');
const uniq = require('lodash.uniq');

const findClosestFileSync = require('../fs/findClosestFileSync');
const logger = require('../logger');

// Usage: gitignore add <filesToBeAdded...>
module.exports = (filesToBeAdded) => {
  const gitignore_path = findClosestFileSync('.gitignore');
  if (!gitignore_path) return logger.error(generate_msg('failure'));

  const ignoredFiles = readFileSync(gitignore_path, 'utf8').trim().split(EOL);
  const updatedFiles = uniq([
    ...ignoredFiles,
    ...filesToBeAdded
  ]).sort();

  writeFileSync(gitignore_path, updatedFiles.join(EOL).trim());

  logger.print(generate_msg('success'));
  logger.print();
  logger.print('> cat .gitignore');
  logger.print(updatedFiles.join(EOL));
};
