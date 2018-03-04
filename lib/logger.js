const logger = (...args) => logger.print(...args);

logger.print = (...args) => console.log(...args);
logger.log = (...args) => console.log('LOG: ', ...args);
logger.error = (...args) => console.warn('ERROR: ', ...args);
logger.warn = (...args) => console.warn('WARN: ', ...args);

module.exports = logger;
