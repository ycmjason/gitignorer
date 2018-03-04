const path = require('path');
const os = require('os');
const { ensureFileSync, emptyDirSync, removeSync } = require('fs-extra');

const findClosestFileSync = require('../../lib/fs/findClosestFileSync');

const TEST_DIR = path.join(os.tmpdir(), 'findClosestFileSync-test');
const CWD = path.join(TEST_DIR, 'a/b/c/d/e/');

describe('findClosestFileSync', () => {
  beforeEach(() => {
    emptyDirSync(CWD);
    process.cwd = jest.fn().mockReturnValue(CWD);
  });

  afterAll(() => removeSync(TEST_DIR));

  test('should find the file at cwd level', () => {
    const FILENAME = 'hello_file.txt';
    ensureFileSync(path.join(CWD, FILENAME));

    expect(findClosestFileSync(FILENAME)).toEqual(path.join(CWD, FILENAME));
  });

  test('should find the file at upper level', () => {
    const FILENAME = 'hello_file.txt';
    ensureFileSync(path.join(TEST_DIR, FILENAME));

    expect(findClosestFileSync(FILENAME)).toEqual(path.join(TEST_DIR, FILENAME));
  });
});
