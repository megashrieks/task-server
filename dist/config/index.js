"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().nonempty().transform(v => parseInt(v, 10)),
    ENVIRONMENT: zod_1.z.string().nonempty(),
    database: zod_1.z.object({
        host: zod_1.z.string().nonempty(),
        port: zod_1.z.string().nonempty().transform(v => parseInt(v, 10)),
        name: zod_1.z.string().nonempty(),
        schema: zod_1.z.string().nonempty(),
        username: zod_1.z.string().nonempty(),
        password: zod_1.z.string().nonempty(),
        ssl: zod_1.z.boolean(),
    }),
});
const validateEnvVariables = (env) => {
    return envSchema.parse(env);
};
const envVariables = {
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        schema: process.env.DATABASE_SCHEMA,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: process.env.ENVIRONMENT !== 'local',
    },
};
exports.default = validateEnvVariables(envVariables);
