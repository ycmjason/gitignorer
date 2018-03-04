const path = require('path');
const os = require('os');
const {
  existsSync,
  ensureFileSync,
  emptyDirSync,
  removeSync,
  readFileSync,
  writeFileSync,
} = require('fs-extra');

const initController = require('../../../lib/controllers/init');
const logger = require('../../../lib/logger');

const TEST_DIR = path.join(os.tmpdir(), 'initController-test');
const CWD = path.join(TEST_DIR, '1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20/21/22/23/');

const GITIGNORE_PATH = path.join(CWD, '.gitignore');
const GITIGNORE_PROFILES_PATH = path.join(TEST_DIR, '.gitignore.profiles.js');

const createGitignoreProfiles = (path, profiles) => {
  writeFileSync(path, `module.exports = ${ JSON.stringify(profiles) };`);
};

describe('controllers.init', () => {
  beforeEach(jest.resetModules);
  beforeEach(() => {
    emptyDirSync(TEST_DIR);
    emptyDirSync(CWD);

    process.cwd = jest.fn().mockReturnValue(CWD);
    os.homedir = jest.fn().mockReturnValue(TEST_DIR);

    logger.print = jest.fn();
    logger.error = jest.fn();
  });

  afterAll(() => removeSync(TEST_DIR));

  [
    {
      desc: 'should create .gitignore file at cwd even without ~/.gitignore_profiles.js',
      expectGitignoreToInclude: [],
    },

    {
      desc: 'should create .gitignore using the default profile when no name is provided',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ]
      },
      useProfile: undefined,
      force: undefined,
      expectGitignoreToInclude: [ 'hello guys', 'wow' ],
    },

    {
      desc: 'should create .gitignore using the default profile when name not found',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ],
        helloyo: [ 'dogs', 'are', 'awesome' ],
      },
      useProfile: 'heloyo',
      force: undefined,
      expectGitignoreToInclude: [ 'hello guys', 'wow' ],
    },

    {
      desc: 'should create .gitignore using the given profile',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ],
        helloyo: [ 'dogs', 'are', 'awesome' ],
      },
      useProfile: 'helloyo',
      force: undefined,
      expectGitignoreToInclude: [ 'dogs', 'are', 'awesome' ],
    },
  ].forEach(({
    desc,
    gitignore_profiles,
    useProfile,
    force,
    expectGitignoreToInclude,
  }) => {
    test(desc, async () => {
      if (gitignore_profiles) {
        createGitignoreProfiles(GITIGNORE_PROFILES_PATH, gitignore_profiles);
      }

      await initController(useProfile, { force });

      expect(existsSync(GITIGNORE_PATH)).toBe(true);
      expect(readFileSync(GITIGNORE_PATH, 'utf8').split('\n')).toEqual(
        expect.arrayContaining(expectGitignoreToInclude)
      );
      expect(logger.print).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  test('should not overwrite the already existing .gitignore', async () => {
    writeFileSync(GITIGNORE_PATH, 'hello');

    await initController('default', {});

    expect(existsSync(GITIGNORE_PATH)).toBe(true);
    expect(readFileSync(GITIGNORE_PATH, 'utf8')).toEqual('hello');
    expect(logger.print).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  test('should overwrite the already existing .gitignore when forced', async () => {
    const FILES = ['he', 'is', 'a', 'handsome', 'boy'];

    writeFileSync(GITIGNORE_PATH, 'hello');

    createGitignoreProfiles(GITIGNORE_PROFILES_PATH, {
      default: FILES,
    });

    await initController('default', { force: true });

    expect(existsSync(GITIGNORE_PATH)).toBe(true);
    expect(readFileSync(GITIGNORE_PATH, 'utf8').split('\n')).toEqual(
      expect.arrayContaining(FILES)
    );
    expect(logger.print).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

});
