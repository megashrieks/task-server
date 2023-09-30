// This file contains all the singletons that are normally used

import config from '../config';
import { TaskDAO } from '../db/dao/task';
import { db } from '../db';
import { TaskService } from '../services/task';
import { Logger } from '../utils/types/logger';
import { ConsoleLogger, WinstonLogger } from './logger';




export const logger: Logger = config.ENVIRONMENT === 'local' ?
	new ConsoleLogger(config.ENVIRONMENT) :
	new WinstonLogger(config.ENVIRONMENT);

export const taskDao = new TaskDAO(db);
export const taskService = new TaskService(taskDao, logger);
