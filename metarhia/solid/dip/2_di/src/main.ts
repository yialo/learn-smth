import { createLogger } from './logger';
import { serveStatic } from './server';
import { AppStorageImpl } from './storage';

const PORT = 8000;

const logger = createLogger('access.log');
const storage = new AppStorageImpl('./static');

serveStatic(storage, logger, PORT);

logger.log(`[DI] Server running at http://127.0.0.1:${PORT}/`);
