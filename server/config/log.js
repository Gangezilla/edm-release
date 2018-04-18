const logger = require('winston');
const moment = require('moment');

logger.setLevels({
    debug:0,
    info: 1,
    silly:2,
    warn: 3,
    error:4,
});
logger.addColors({
    debug: 'green',
    info:  'cyan',
    silly: 'magenta',
    warn:  'yellow',
    error: 'red'
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  level: 'silly',
  colorize: true,
  timestamp: function() { return (moment().format('DD/MM/YYYY, HH:mm:ss')); },
 });

module.exports = logger;
