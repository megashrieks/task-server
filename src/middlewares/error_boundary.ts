import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/store';
import { NotFoundError } from '../utils/errors/not_found_error';
import config from '../config';
export const errorBoundary = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	logger.error(err);
	if (err instanceof NotFoundError) {
		res.status(404).json({
			error: true,
			message: err.message,
		});
	} else res.status(500).json({
		error: true,
		message: 'Error occured in the server',
		...(config.ENVIRONMENT !== 'production' ? {reason: err.message} : {})
	});
	next();
};
