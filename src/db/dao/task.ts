
import { eq, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NewTask, task, Task } from '../models/task';
import { NotFoundError } from '../../utils/errors/not_found_error';

export class TaskDAO {

	constructor(private db: NodePgDatabase) {}

	async getAllTasks(offset: number, limit: number): Promise<Task[]> {
		return this.db
			.select()
			.from(task)
			.offset(offset)
			.limit(limit);
	}

	async getTask(taskId: string): Promise<Task> {
		const targetTask = await this.db
			.select()
			.from(task)
			.where(eq(task.id, taskId))
			.limit(1);

		const first = targetTask[0];
		if (!first) {
			throw new NotFoundError('task not found for id: ' + taskId);
		}

		return first;

	}

	async getAllTaskMetricsByDate(): Promise<{date: string, status: string, count: number}[]> {
		return this.db
			.select({
				date: task.date,
				status: task.status,
				count: sql<number>`count(${task.date})`
			})
			.from(task)
			.groupBy(task.date, task.status)
			
	}

	async createTask(newTask: NewTask): Promise<Task> {
		const [insertedTask]:Task[] = await this.db.insert(task).values(newTask).returning();
		if (!insertedTask) throw new Error('Task could not be inserted');
		return insertedTask;
	}

	async updateTask(id: string, taskUpdate: Partial<Task>): Promise<Task> {
		const [updatedTask]:Task[] = await this.db
				.update(task)
				.set(taskUpdate)
				.where(eq(task.id, id))
				.returning();
		if (!updatedTask) throw new Error('Task could not be updated');
		return updatedTask;
	}
}
