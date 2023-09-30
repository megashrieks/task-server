import 'express-async-errors'
import express from 'express';
import { taskRouter } from './task';

export const router = express.Router();


router.use('/task', taskRouter);
