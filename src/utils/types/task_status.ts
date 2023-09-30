import { z } from 'zod';

export const taskStatus = z.enum(['OPEN', 'INPROGRESS', 'COMPLETED']);

export type TaskStatus = z.infer<typeof taskStatus>;
