
import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/store';

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	logger.debug('received request: ', req.method, req.url);
	next();
}
