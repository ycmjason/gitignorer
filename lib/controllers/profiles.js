const os = require('os');
const { EOL } = os;
const path = require('path');
const { existsSync } = require('fs');

const chalk = require('chalk');

const { GITIGNORE_PROFILES_NOT_FOUND } = require('../messages');
const { getProfiles } = require('../profiles');
const logger = require('../logger');

module.exports = async () => {
  if (!existsSync(path.join(os.homedir(), '.gitignore.profiles.js'))) return logger.error(GITIGNORE_PROFILES_NOT_FOUND);

  const profiles = await getProfiles();

  logger.success(Object.entries(profiles).map(([profileName, files]) => {
    const name = chalk.bold.white.underline(profileName);
    const filesInLines = chalk.white(files.map(file => `  |- ${file}`).join(EOL));
    return ' ' + name + EOL + filesInLines + EOL;
  }).join(EOL));

  logger.print('You can create a .gitignore using `gitignore init [profile]`');
};
