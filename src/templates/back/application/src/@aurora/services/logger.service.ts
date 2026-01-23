import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const logger = (): LoggerService => {
  return WinstonModule.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
    ),
    transports: [
      new winston.transports.File({
        filename: process.env.LOGGER_ERROR_LOG_PATH,
        level: 'error',
        maxsize: 5242880,
        maxFiles: 5,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
          }),
          winston.format.label({ label: 'LOG' }),
          winston.format.simple(),
          winston.format.printf(
            ({ level, message, label, timestamp, context }) => {
              return `${timestamp}   ${label} [${context}] ${message}`;
            },
          ),
        ),
      }),
      new winston.transports.File({
        filename: process.env.LOGGER_CONSOLE_LOG_PATH,
        maxsize: 5242880,
        maxFiles: 5,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
          }),
          winston.format.label({ label: 'LOG' }),
          winston.format.simple(),
          winston.format.printf(
            ({ level, message, label, timestamp, context }) => {
              return `${timestamp}   ${label} [${context}] ${message}`;
            },
          ),
        ),
      }),
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
          }),
          winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
          }),
          winston.format.label({ label: 'LOG' }),
          winston.format.simple(),
          winston.format.printf(
            ({ level, message, label, timestamp, context }) => {
              return chalk`${timestamp}   {keyword('green') ${label}} {keyword('yellow') [${context}]} ${message}`;
            },
          ),
        ),
      }),
    ],
  });
};
