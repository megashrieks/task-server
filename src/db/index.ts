
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import config from '../config';
import { parseDbUrl } from '../utils';

const dbUrl = parseDbUrl(config.database);

const client = postgres(dbUrl, { ssl: config.database.ssl });
export const db = drizzle(client);
