"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.WinstonLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { errors, colorize, timestamp } = winston_1.default.format;
class WinstonLogger {
    constructor(environment) {
        const consoleformat = winston_1.default.format.combine(colorize(), winston_1.default.format.printf(({ level, message, timestamp, stack, }) => `${timestamp} [${level}]: ${message} ${stack !== null && stack !== void 0 ? stack : ''}`));
        const fileformat = winston_1.default.format.combine(winston_1.default.format.printf(({ level, message, timestamp, stack, }) => `${timestamp} [${level}]: ${message} ${stack !== null && stack !== void 0 ? stack : ''}`));
        this.logger = winston_1.default.createLogger({
            level: environment === 'production' ? 'info' : 'debug',
            format: winston_1.default.format.combine(errors({ stack: true }), timestamp()),
            transports: [
                new winston_1.default.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                    format: fileformat,
                }),
                new winston_1.default.transports.File({ filename: 'logs/app.log', format: fileformat }),
                new winston_1.default.transports.Console({
                    silent: environment === 'production',
                    format: consoleformat,
                }),
            ],
        });
    }
    log(args, level) {
        if (args.length === 1) {
            if (args[0] instanceof Error) {
                this.logger[level](args[0]);
                return;
            }
        }
        const message = [];
        for (const i of args) {
            if (i instanceof Object) {
                message.push(JSON.stringify(i, null, 4));
            }
            else {
                message.push(i);
            }
        }
        this.logger[level](message.join(' '));
    }
    debug(...args) {
        this.log(args, 'debug');
    }
    info(...args) {
        this.log(args, 'info');
    }
    error(...args) {
        this.log(args, 'error');
    }
}
exports.WinstonLogger = WinstonLogger;
class ConsoleLogger {
    constructor(environment) {
        this.environment = environment;
    }
    info(...any) {
        console.info(...any);
    }
    error(...any) {
        console.error(...any);
    }
    debug(...any) {
        if (this.environment !== 'production')
            console.debug(...any);
    }
}
exports.ConsoleLogger = ConsoleLogger;
