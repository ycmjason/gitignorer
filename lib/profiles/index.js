const os = require('os');
const path = require('path');

const GITIGNORE_PROFILES_FILENAME = '.gitignore.profiles.js';

const resolvePromisesInValues = require('../utils/resolvePromisesInValues');

const getProfilesProxy = () => require('./init')(path.join(os.homedir(), GITIGNORE_PROFILES_FILENAME));

exports.getProfiles = async () => await resolvePromisesInValues(getProfilesProxy(), x => x);

exports.getProfile = (name) => getProfilesProxy()[name];
