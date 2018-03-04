const path = require('path');
const { tmpdir } = require('os');
const {
  ensureFileSync,
  emptyDirSync,
  removeSync,
  readFileSync,
  writeFileSync,
} = require('fs-extra');

const addController = require('../../../lib/controllers/add');
const logger = require('../../../lib/logger');

const TEST_DIR = path.join(tmpdir(), 'addController-test');
const CWD = path.join(TEST_DIR, '1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20/21/22/23/');

const GITIGNORE_FILENAME = '.gitignore';

const specs = [
  {
    desc: 'should successfully add stuff to gitignore at cwd',
    gitignore_path: path.join(CWD, GITIGNORE_FILENAME),
    existingContent: `a1\na2\na3`,
    addFiles: [
      'f1',
      'f2',
      'f3',
    ],
    expectation: `a1\na2\na3\nf1\nf2\nf3`,
  },

  {
    desc: 'should successfully add stuff to gitignore at upper dir',
    gitignore_path: path.join(CWD, '../..', GITIGNORE_FILENAME),
    existingContent: `a1\na2\na3`,
    addFiles: [
      'f1',
      'f2',
      'f3',
    ],
    expectation: `a1\na2\na3\nf1\nf2\nf3`,
  },

  {
    desc: 'should sort the files',
    gitignore_path: path.join(CWD, GITIGNORE_FILENAME),
    existingContent: `f3\na2\nf1`,
    addFiles: [
      'a1',
      'f2',
      'a3',
    ],
    expectation: `a1\na2\na3\nf1\nf2\nf3`,
  },
];

describe('controllers.add', () => {
  beforeEach(() => {
    emptyDirSync(TEST_DIR);
    emptyDirSync(CWD);
    process.cwd = jest.fn().mockReturnValue(CWD);
    logger.print = jest.fn();
    logger.error = jest.fn();
  });

  afterAll(() => removeSync(TEST_DIR));

  specs.forEach(({
    desc,
    gitignore_path,
    existingContent,
    addFiles,
    expectation,
  }) => {
    test(desc, () => {
      ensureFileSync(gitignore_path);
      writeFileSync(gitignore_path, existingContent);
      addController(addFiles);

      expect(readFileSync(gitignore_path, 'utf8')).toEqual(expectation);

      expect(logger.print).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  test('should not be able to find gitignore if it is too far up (>20)', () => {
    const gitignore_path = path.join(TEST_DIR, GITIGNORE_FILENAME);
    addController(['hi']);

    expect(logger.print).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

});
