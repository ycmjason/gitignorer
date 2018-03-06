const path = require('path');
const os = require('os');
const {
  emptyDirSync,
  removeSync,
  writeFileSync,
} = require('fs-extra');

// hooks helper
exports.beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll = (n) => {
  const home = path.join(os.tmpdir(), `${Math.random()}`);
  const cwd = path.join(home, ...Array.from({ length: n }, (_, i) => `${i}`));

  beforeEach(() => {
    emptyDirSync(home);
    emptyDirSync(cwd);

    process.cwd = jest.fn().mockReturnValue(cwd);
    os.homedir = jest.fn().mockReturnValue(home);
  });

  afterAll(() => removeSync(home));

  return {
    home,
    cwd,
  };
};

exports.createGitignoreProfiles = (dir, profiles) => {
  writeFileSync(
    path.join(dir, '.gitignore.profiles.js'),
    `module.exports = ${ JSON.stringify(profiles) };`
  );
};
