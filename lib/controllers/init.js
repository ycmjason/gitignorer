const { EOL } = require('os');
const { existsSync, writeFileSync, readFileSync } = require('fs');
const path = require('path');

const { getProfile } = require('../profiles');
const logger = require('../logger');

const { GITIGNORE_EXISTS } = require('../messages');

const HEADER = (profileName) => `# created by gitignorer
# profile used: ${profileName}` + EOL;

module.exports = async (
  profileName = "default",
  { force = false } = {},
) => {
  const GITIGNORE_PATH = path.join(process.cwd(), '.gitignore');

  if (!force && existsSync(GITIGNORE_PATH)) return logger.error(GITIGNORE_EXISTS);

  const files = await getProfile(profileName);
  const file_content = HEADER(profileName) + files.join(EOL);

  writeFileSync(path.join(process.cwd(), '.gitignore'), file_content + EOL);

  logger.success('> cat .gitignore', EOL, file_content);
};
