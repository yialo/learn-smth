import { logger } from './logger';
import { serveStatic } from './server';

const PORT = 8000;

serveStatic('./static', PORT);

logger.log(`[No-DI] Server running at http://127.0.0.1:${PORT}/`);
