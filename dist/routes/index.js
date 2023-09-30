"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const task_1 = require("./task");
exports.router = express_1.default.Router();
exports.router.use('/task', task_1.taskRouter);
