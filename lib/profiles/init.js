const PROFILES_NOT_FOUND = (gitignore_profiles_path) => `Error: can't find profiles at ${gitignore_profiles_path}.\n`

const fs = require('fs');
const path = require('path');
const os = require('os');

const axios = require('axios');

module.exports = (gitignore_profiles_path) => {
  const gitignore_profiles = {
    default: [],
    ...(fs.existsSync(gitignore_profiles_path)? require(gitignore_profiles_path): {}),
  };

  return new Proxy(gitignore_profiles, {
    get(profiles, profileName) {
      if (!(profileName in profiles)) profileName = 'default';

      return Promise.all(profiles[profileName].map(ignoredFile => {
        if (!/^url: /.test(ignoredFile)) return Promise.resolve(ignoredFile);

        const url = ignoredFile.match(/^url: (.*)/)[1].trim();
        return axios.get(url).then(res => res.data);
      }));
    },
  });
};
