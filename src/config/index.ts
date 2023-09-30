import { z } from 'zod';

const envSchema = z.object({
	PORT: z.string().nonempty().transform(v => parseInt(v, 10)),
	ENVIRONMENT: z.string().nonempty(),
	database: z.object({
		host: z.string().nonempty(),
		port: z.string().nonempty().transform(v => parseInt(v, 10)),
		name: z.string().nonempty(),
		schema: z.string().nonempty(),
		username: z.string().nonempty(),
		password: z.string().nonempty(),
		ssl: z.boolean(),
	}),
});

type EnvVariables = z.infer<typeof envSchema>;

const validateEnvVariables = (env: any): EnvVariables => {
	return envSchema.parse(env);
}

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


export default validateEnvVariables(envVariables);
