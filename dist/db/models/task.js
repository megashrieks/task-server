"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTaskSchema = exports.TaskSchema = exports.task = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.task = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    date: (0, pg_core_1.date)('date').notNull(),
    status: (0, pg_core_1.varchar)('status').default('OPEN').notNull(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    description: (0, pg_core_1.varchar)('description').notNull(),
}, (table) => ({
    dateIndex: (0, pg_core_1.index)('task_date_index').on(table.date, table.status),
}));
exports.TaskSchema = (0, drizzle_zod_1.createSelectSchema)(exports.task);
exports.NewTaskSchema = (0, drizzle_zod_1.createInsertSchema)(exports.task);
