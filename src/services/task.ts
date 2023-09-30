import { TaskDAO } from '../db/dao/task';
import { ValidationError } from '../utils/errors/validation_error';
import { NewTask, NewTaskSchema, Task, TaskSchema } from '../db/models/task';
import { Logger } from '../utils/types/logger';
import { z } from 'zod';
import { taskStatus } from '../utils/types/task_status';

export class TaskService {
	constructor(private taskDao: TaskDAO, private logger: Logger) {}

	async addTask(newTask: NewTask): Promise<Task> {
		this.validateNewTask(newTask);
		this.logger.info('inserting task: ', newTask);
		return this.taskDao.createTask(newTask);
	}

	async updateTask(id: string, updatedTask: Partial<Task>): Promise<Task> {
		this.validateTaskUpdate(id, updatedTask);
		this.logger.info('updating task: ', updatedTask);
		return this.taskDao.updateTask(id, updatedTask);
	}

	async getAllTasks(pageNumber: number, pageSize: number): Promise<Task[]> { 
		// pageNumber starts from 0
		this.logger.info('getting all tasks');
		return this.taskDao.getAllTasks(pageNumber * pageSize, pageSize)
	}

	async getTask(taskId: string): Promise<Task> { 
		// pageNumber starts from 0
		this.validateTaskId(taskId);
		this.logger.info('getting task: ', taskId);
		return this.taskDao.getTask(taskId)
	}

	async getAllTaskMetricsByDate(): Promise<Record<string, object>> { 
		this.logger.info('getting all metrics by date')

		// getAllTaskMetricsByDate returns in the format of date, status, count
		// need to convert it to date: {status: count} for all statuses for a date
		const metrics = await this.taskDao.getAllTaskMetricsByDate()
		const metricsByDate = metrics.reduce((previous: Record<string, Record<string, number>>, current: typeof metrics[number]) => {
			const entry = previous[current.date];
			if (entry !== undefined) {
				previous[current.date] = {
					...entry,
					[current.status]: current.count
				};
			} else {
				previous[current.date] = { 
					[current.status]: current.count
				};
			}
			return previous;
		}, {});
		return metricsByDate
	}

	validateNewTask(newTask: NewTask) {
		try {
			NewTaskSchema.parse(newTask);
			taskStatus.parse(newTask.status);
		} catch (err) {
			this.logger.error('failed to parse new task')
			this.logger.error(err);
			throw new ValidationError('invalid input for new task');
		}
	}

	validateTaskUpdate(id: string, taskUpdate: Partial<Task>) {
		try {
			z.string().parse(id);
			TaskSchema.omit({id: true}).partial().parse(taskUpdate);
			if (taskUpdate.status) {
				taskStatus.parse(taskUpdate.status);
			}
		} catch (err) {
			this.logger.error('failed to parse task update')
			this.logger.error(err);
			throw new ValidationError('invalid input for task update');
		}
	}


	validateTaskId(id: string) {
		try {
			z.string().parse(id);
		} catch (err) {
			this.logger.error('failed to parse task id')
			this.logger.error(err);
			throw new ValidationError('invalid input for task id');
		}
	}

}
