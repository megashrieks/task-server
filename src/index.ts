import express from 'express';
import config from './config';
import cors from 'cors';
import { logger } from './utils/store';
import { router } from './routes';
import { errorBoundary } from './middlewares/error_boundary';
import { requestLogger } from './middlewares/logging_middleware';
const app = express();


app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options('*', cors())

// main routes
app.use('/',router);

app.use(errorBoundary);

app.listen(config.PORT, async () => {
	logger.debug('Listening to port :', config.PORT);
});
