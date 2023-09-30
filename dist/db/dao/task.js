"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDAO = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const task_1 = require("../models/task");
const not_found_error_1 = require("../../utils/errors/not_found_error");
class TaskDAO {
    constructor(db) {
        this.db = db;
    }
    getAllTasks(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db
                .select()
                .from(task_1.task)
                .offset(offset)
                .limit(limit);
        });
    }
    getTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetTask = yield this.db
                .select()
                .from(task_1.task)
                .where((0, drizzle_orm_1.eq)(task_1.task.id, taskId))
                .limit(1);
            const first = targetTask[0];
            if (!first) {
                throw new not_found_error_1.NotFoundError('task not found for id: ' + taskId);
            }
            return first;
        });
    }
    getAllTaskMetricsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db
                .select({
                date: task_1.task.date,
                status: task_1.task.status,
                count: (0, drizzle_orm_1.sql) `count(${task_1.task.date})`
            })
                .from(task_1.task)
                .groupBy(task_1.task.date, task_1.task.status);
        });
    }
    createTask(newTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const [insertedTask] = yield this.db.insert(task_1.task).values(newTask).returning();
            if (!insertedTask)
                throw new Error('Task could not be inserted');
            return insertedTask;
        });
    }
    updateTask(id, taskUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedTask] = yield this.db
                .update(task_1.task)
                .set(taskUpdate)
                .where((0, drizzle_orm_1.eq)(task_1.task.id, id))
                .returning();
            if (!updatedTask)
                throw new Error('Task could not be updated');
            return updatedTask;
        });
    }
}
exports.TaskDAO = TaskDAO;
