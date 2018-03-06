const { EOL } = require('os');

const chalk = require('chalk');

const generate_msg = require('msg-generator');

const logger = (...args) => logger.print(...args);
logger.print = (...args) => console.log(...args);
logger.log = (...args) => console.log('LOG: ', ...args);

logger.success = (...args) => console.log(
  EOL +
  chalk.green.bold(generate_msg('success')) + EOL + EOL +
  args.join(' ')
);

logger.error = (...args) => console.error(
  EOL +
  chalk.red.bold(generate_msg('failure')) + EOL + EOL +
  chalk.red.bold('ERROR: ') + args.join(' ')
);

logger.warn = (...args) => console.warn(
  EOL +
  chalk.yellow.bold(generate_msg('failure_troll')) + EOL + EOL +
  chalk.yellow.bold('WARN: ') + args.join(' ')
);

module.exports = logger;
