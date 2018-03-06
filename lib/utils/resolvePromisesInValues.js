const asyncMapValues = require('./asyncMapValues');

module.exports = (obj) => asyncMapValues(obj, v => v);
