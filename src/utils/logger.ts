import winston from 'winston'
import { Logger } from './types/logger';

const { errors, colorize, timestamp } = winston.format;

export class WinstonLogger implements Logger {
	private logger: winston.Logger;
	constructor(environment: string) {
		const consoleformat = winston.format.combine(
			colorize(),
			winston.format.printf(({
				level, message, timestamp, stack,
			}) => `${timestamp} [${level}]: ${message} ${stack ?? ''}`),
		);
		const fileformat = winston.format.combine(
			winston.format.printf(({
				level, message, timestamp, stack,
			}) => `${timestamp} [${level}]: ${message} ${stack ?? ''}`),
		);

		this.logger = winston.createLogger({
			level: environment === 'production' ? 'info' : 'debug',
			format: winston.format.combine(errors({ stack: true }), timestamp()),
			transports: [
				new winston.transports.File({
					filename: 'logs/error.log',
					level: 'error',
					format: fileformat,
				}),
				new winston.transports.File({ filename: 'logs/app.log', format: fileformat }),
				new winston.transports.Console({
					silent: environment === 'production',
					format: consoleformat,
				}),
			],
		});
	}

	log(args: any[], level: 'info' | 'error' | 'debug'): any {
		if (args.length === 1) {
			if (args[0] instanceof Error) {
				this.logger[level](args[0]);
				return;
			}
		}
		const message: string[] = [];
		for (const i of args) {
			if (i instanceof Object) {
				message.push(JSON.stringify(i, null, 4));
			} else {
				message.push(i as string);
			}
		}
		this.logger[level](message.join(' '));
	}

	debug(...args: any[]): void {
		this.log(args, 'debug');
	}

	info(...args: any[]): void {
		this.log(args, 'info');
	}
	
	error(...args: any[]): void {
		this.log(args, 'error');
	}

}


export class ConsoleLogger implements Logger {
	constructor(private environment: string) {}

	info(...any: any[]) {
		console.info(...any);
	}
	error(...any: any[]) {
		console.error(...any);
	}
	debug(...any: any[]) {
		if (this.environment !== 'production')
			console.debug(...any);
	}
}
