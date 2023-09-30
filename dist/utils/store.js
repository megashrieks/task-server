"use strict";
// This file contains all the singletons that are normally used
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.taskDao = exports.logger = void 0;
const config_1 = __importDefault(require("../config"));
const task_1 = require("../db/dao/task");
const db_1 = require("../db");
const task_2 = require("../services/task");
const logger_1 = require("./logger");
exports.logger = config_1.default.ENVIRONMENT === 'local' ?
    new logger_1.ConsoleLogger(config_1.default.ENVIRONMENT) :
    new logger_1.WinstonLogger(config_1.default.ENVIRONMENT);
exports.taskDao = new task_1.TaskDAO(db_1.db);
exports.taskService = new task_2.TaskService(exports.taskDao, exports.logger);
