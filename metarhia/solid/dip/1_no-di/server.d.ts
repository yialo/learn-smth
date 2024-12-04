import { logger } from './logger';

export declare function serveStatic(
  folder: string,
  port: number,
): Promise<void>;
