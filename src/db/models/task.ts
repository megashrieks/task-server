import { InferModel } from 'drizzle-orm';
import { date, index, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const task = pgTable('tasks', {
	id: uuid('id').primaryKey().defaultRandom(),
	date: date('date').notNull(),
	status: varchar('status').default('OPEN').notNull(),
	title: varchar('title').notNull(),
	description: varchar('description').notNull(),
}, (table) => ({
	dateIndex: index('task_date_index').on(table.date, table.status),
}));

export type Task = InferModel<typeof task>;
export type NewTask = InferModel<typeof task, 'insert'>;

export const TaskSchema = createSelectSchema(task);
export const NewTaskSchema = createInsertSchema(task);

