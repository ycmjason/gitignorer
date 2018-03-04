const os = require('os');
const path = require('path');

const GITIGNORE_PROFILES_FILENAME = '.gitignore.profiles.js';

module.exports = () => require('./init')(path.join(os.homedir(), GITIGNORE_PROFILES_FILENAME));
