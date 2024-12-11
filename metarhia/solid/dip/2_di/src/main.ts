import {
  createPassThroughLogger,
  createFileLogger,
  createConsoleLogger,
} from './logger';
import { serveStatic } from './server';
import { AppStorageImpl } from './storage';

const PORT = 8000;

const logger = createPassThroughLogger('access.log');
const storage = new AppStorageImpl('./static');

serveStatic(storage, logger, PORT);

logger.log(`[DI] Server running at http://127.0.0.1:${PORT}/`);
