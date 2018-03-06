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

const profilesController = require('../../lib/controllers/profiles');

describe('controllers.profiles', () => {
  beforeEach(jest.resetModules);

  const {
    home,
    cwd,
  } = beforeEachCreateHomeAndCreateCwdAtNthLevelDeep_afterAllRemoveAll(24);

  beforeEach(() => {
    logger.success = jest.fn();
    logger.error = jest.fn();
    logger.print = jest.fn();
  });

  test('should show some error when gitignore profiles not found', async () => {
    await profilesController();

    expect(logger.success).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  test('should list all profiles', async () => {
    createGitignoreProfiles(home, {
      default: [ 'a', 'b', 'c' ],
      car: [ '1', '2', '3' ],
    });

    await profilesController();

    expect(logger.success).toHaveBeenCalledTimes(1);
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('default'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('a'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('b'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('c'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('car'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('1'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('2'));
    expect(logger.success.mock.calls[0].join('')).toEqual(expect.stringContaining('3'));
    expect(logger.error).not.toHaveBeenCalled();
  });

  test('should show some instructions on how to `gitignore init`', async () => {
    createGitignoreProfiles(home, {
      default: [ 'a', 'b', 'c' ],
      car: [ '1', '2', '3' ],
    });

    await profilesController();

    expect(logger.success).toHaveBeenCalledTimes(1);
    expect(logger.print).toHaveBeenCalledTimes(1);
    expect(logger.print.mock.calls[0].join('')).toEqual(expect.stringContaining('gitignore init'));
    expect(logger.error).not.toHaveBeenCalled();
  });

});
