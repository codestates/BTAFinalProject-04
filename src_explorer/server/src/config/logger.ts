const winston = require('winston') ;
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = 'log'; 

// Define log format
const logFormat = printf((info: any) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/combined',
      filename: `%DATE%.combined.log`,
      maxFiles: 30, 
      zippedArchive: true, 
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

logger.stream = {
  write: (message: any, encoding: any) => {
    console.log("message:", message);
    let newMessage = message.substring(0, message.lastIndexOf("\n"));
    logger.info(newMessage);
  }
}


export default logger;