"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStatus = void 0;
const zod_1 = require("zod");
exports.taskStatus = zod_1.z.enum(['OPEN', 'INPROGRESS', 'COMPLETED']);
