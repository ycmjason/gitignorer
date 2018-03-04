const fs = require('fs');
const path = require('path');

const findClosestFileSync = (filename, maxDepth = 20, cwd = process.cwd()) => {
  if (maxDepth === 0) return undefined;
  if (cwd === '/') maxDepth = 1;

  const expectedFilepath = path.join(cwd, filename);

  if (fs.existsSync(expectedFilepath)) return expectedFilepath;

  return findClosestFileSync(filename, maxDepth - 1, path.dirname(cwd));
};

module.exports = findClosestFileSync;
