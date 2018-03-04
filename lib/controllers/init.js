const { EOL } = require('os');
const { existsSync, writeFileSync, readFileSync } = require('fs');
const path = require('path');

const generate_msg = require('msg-generator');

const profiles = require('../profiles');
const logger = require('../logger');

const FILE_EXISTS = '.gitignore already exists. add -f to overwrite it.';

const HEADER = (profileName) => `# created by gitignorer
# profile used: ${profileName}` + EOL;

module.exports = async (
  profileName = "default",
  { force = false } = {},
) => {
  const GITIGNORE_PATH = path.join(process.cwd(), '.gitignore');

  if(!force && existsSync(GITIGNORE_PATH)) return logger.error(FILE_EXISTS);

  const files = await profiles()[profileName];
  const file_content = HEADER(profileName) + files.join(EOL);

  writeFileSync(path.join(process.cwd(), '.gitignore'), file_content + EOL);

  logger.print(generate_msg('success'));
  logger.print();
  logger.print(`> cat .gitignore`);
  logger.print(file_content);
};
