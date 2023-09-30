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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const store_1 = require("../../utils/store");
const validation_error_1 = require("../../utils/errors/validation_error");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create task
    res.json(yield store_1.taskService.addTask(req.body));
}));
exports.taskRouter.patch('/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // update task
    res.json(yield store_1.taskService.updateTask(req.params.taskId, req.body));
}));
exports.taskRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all task
    const { pageSize, page } = req.query;
    if (typeof pageSize !== 'string' || typeof page !== 'string') {
        throw new validation_error_1.ValidationError('pagesize or page parameter invalid in request query');
    }
    res.json(yield store_1.taskService.getAllTasks(parseInt(page, 10), parseInt(pageSize, 10)));
}));
exports.taskRouter.get('/metrics', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get metrics for a task
    res.json(yield store_1.taskService.getAllTaskMetricsByDate());
}));
exports.taskRouter.get('/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get a task
    res.json(yield store_1.taskService.getTask(req.params.taskId));
}));
