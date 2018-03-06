const path = require('path');
const {
  existsSync,
  readFileSync,
  writeFileSync,
} = require('fs-extra');

const logger = require('../../lib/logger');
const {
  createGitignoreProfiles,
  beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll,
} = require('./helpers');

const initController = require('../../lib/controllers/init');

describe('controllers.init', () => {
  beforeEach(jest.resetModules);

  const {
    home,
    cwd,
  } = beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll(24);

  beforeEach(() => {
    logger.success = jest.fn();
    logger.error = jest.fn();
  });

  [
    {
      desc: 'should create .gitignore using the default profile when no name is provided',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ],
        hello: [ 'someting', 'else' ],
      },
      useProfile: undefined,
      expectGitignoreToInclude: [ 'hello guys', 'wow' ],
    },

    {
      desc: 'should create .gitignore using the default profile when name not found',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ],
        helloyo: [ 'dogs', 'are', 'awesome' ],
      },
      useProfile: 'heloyo',
      expectGitignoreToInclude: [ 'hello guys', 'wow' ],
    },

    {
      desc: 'should create .gitignore using the given profile',
      gitignore_profiles: {
        default: [ 'hello guys', 'wow' ],
        helloyo: [ 'dogs', 'are', 'awesome' ],
      },
      useProfile: 'helloyo',
      expectGitignoreToInclude: [ 'dogs', 'are', 'awesome' ],
    },
  ].forEach(({
    desc,
    gitignore_profiles,
    useProfile,
    expectGitignoreToInclude,
  }) => {
    test(desc, async () => {
      createGitignoreProfiles(home, gitignore_profiles);

      await initController(useProfile);

      const expected_gitignore_path = path.join(cwd, '.gitignore');
      expect(existsSync(expected_gitignore_path)).toBe(true);
      expect(readFileSync(expected_gitignore_path, 'utf8').split('\n')).toEqual(
        expect.arrayContaining(expectGitignoreToInclude)
      );
      expect(logger.success).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  test('should create .gitignore file at cwd even without ~/.gitignore_profiles.js', async () => {
    await initController(undefined);

    const expected_gitignore_path = path.join(cwd, '.gitignore');
    expect(existsSync(expected_gitignore_path)).toBe(true);
  });

  test('should not overwrite the already existing .gitignore', async () => {
    const gitignore_path = path.join(cwd, '.gitignore');
    writeFileSync(gitignore_path, 'hello');

    await initController('default', {});

    expect(existsSync(gitignore_path)).toBe(true);
    expect(readFileSync(gitignore_path, 'utf8')).toEqual('hello');
    expect(logger.success).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  test('should overwrite the already existing .gitignore when forced', async () => {
    const gitignore_path = path.join(cwd, '.gitignore');
    const FILES = ['he', 'is', 'a', 'handsome', 'boy'];

    writeFileSync(gitignore_path, 'hello');

    createGitignoreProfiles(home, {
      default: FILES,
    });

    await initController('default', { force: true });

    expect(existsSync(gitignore_path)).toBe(true);
    expect(readFileSync(gitignore_path, 'utf8').split('\n')).toEqual(
      expect.arrayContaining(FILES)
    );
    expect(logger.success).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

});
