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
exports.TaskService = void 0;
const validation_error_1 = require("../utils/errors/validation_error");
const task_1 = require("../db/models/task");
const zod_1 = require("zod");
const task_status_1 = require("../utils/types/task_status");
class TaskService {
    constructor(taskDao, logger) {
        this.taskDao = taskDao;
        this.logger = logger;
    }
    addTask(newTask) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateNewTask(newTask);
            this.logger.info('inserting task: ', newTask);
            return this.taskDao.createTask(newTask);
        });
    }
    updateTask(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTaskUpdate(id, updatedTask);
            this.logger.info('updating task: ', updatedTask);
            return this.taskDao.updateTask(id, updatedTask);
        });
    }
    getAllTasks(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            // pageNumber starts from 0
            this.logger.info('getting all tasks');
            return this.taskDao.getAllTasks(pageNumber * pageSize, pageSize);
        });
    }
    getTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            // pageNumber starts from 0
            this.validateTaskId(taskId);
            this.logger.info('getting task: ', taskId);
            return this.taskDao.getTask(taskId);
        });
    }
    getAllTaskMetricsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('getting all metrics by date');
            // getAllTaskMetricsByDate returns in the format of date, status, count
            // need to convert it to date: {status: count} for all statuses for a date
            const metrics = yield this.taskDao.getAllTaskMetricsByDate();
            const metricsByDate = metrics.reduce((previous, current) => {
                const entry = previous[current.date];
                if (entry !== undefined) {
                    previous[current.date] = Object.assign(Object.assign({}, entry), { [current.status]: current.count });
                }
                else {
                    previous[current.date] = {
                        [current.status]: current.count
                    };
                }
                return previous;
            }, {});
            return metricsByDate;
        });
    }
    validateNewTask(newTask) {
        try {
            task_1.NewTaskSchema.parse(newTask);
            task_status_1.taskStatus.parse(newTask.status);
        }
        catch (err) {
            this.logger.error('failed to parse new task');
            this.logger.error(err);
            throw new validation_error_1.ValidationError('invalid input for new task');
        }
    }
    validateTaskUpdate(id, taskUpdate) {
        try {
            zod_1.z.string().parse(id);
            task_1.TaskSchema.omit({ id: true }).partial().parse(taskUpdate);
            if (taskUpdate.status) {
                task_status_1.taskStatus.parse(taskUpdate.status);
            }
        }
        catch (err) {
            this.logger.error('failed to parse task update');
            this.logger.error(err);
            throw new validation_error_1.ValidationError('invalid input for task update');
        }
    }
    validateTaskId(id) {
        try {
            zod_1.z.string().parse(id);
        }
        catch (err) {
            this.logger.error('failed to parse task id');
            this.logger.error(err);
            throw new validation_error_1.ValidationError('invalid input for task id');
        }
    }
}
exports.TaskService = TaskService;
