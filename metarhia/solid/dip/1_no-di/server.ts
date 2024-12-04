import { createServer } from 'node:http';
import { logger } from './logger';
import { Storage } from './storage';

export declare function serveStatic(folder: string, port: number): void;
