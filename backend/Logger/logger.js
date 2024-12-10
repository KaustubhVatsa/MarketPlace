import winston from "winston";


export const logger = () => {
  return winston.createLogger({
    level: "info", // Minimum level of log to capture
    transports: [
      // Log to console
      new winston.transports.Console({
        format: winston.format.simple(), 
      }),
      // Log to file (errors only)
      new winston.transports.File({
        filename: "error.log", 
        level: "error", 
        format: winston.format.combine(
          winston.format.timestamp(), // Add a timestamp to each log
          winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`; 
          })
        ),
      }),
    ],
  });
};
