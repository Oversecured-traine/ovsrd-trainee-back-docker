const winston = require('winston');

console.log('hello');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

module.exports = logger;
