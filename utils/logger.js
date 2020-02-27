const winston = require('winston');


module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logDirectory/combined.log' })
    ]
});
