import 'express-async-errors'
import express, { Request, Response } from 'express';
import { taskService } from '../../utils/store';
import { ValidationError } from '../../utils/errors/validation_error';

export const taskRouter = express.Router();

taskRouter.post('/', async (req: Request, res: Response) => {
	// create task
	res.json(await taskService.addTask(req.body));
});

taskRouter.patch('/:taskId', async (req: Request, res: Response) => {
	// update task
	res.json(await taskService.updateTask(req.params.taskId!, req.body));
});

taskRouter.get('/all', async (req: Request, res: Response) => {
	// get all task
	const { pageSize, page } = req.query;
	if (typeof pageSize !== 'string' || typeof page !== 'string') {
		throw new ValidationError('pagesize or page parameter invalid in request query');
	}
	res.json(await taskService.getAllTasks(parseInt(page!, 10), parseInt(pageSize, 10)));
});

taskRouter.get('/metrics', async (_req: Request, res: Response) => {
	// get metrics for a task
	res.json(await taskService.getAllTaskMetricsByDate());
});


taskRouter.get('/:taskId', async (req: Request, res: Response) => {
	// get a task
	res.json(await taskService.getTask(req.params.taskId!));
});
