import { createServer } from 'node:http';
import { logger } from './logger';
import { AppStorage } from './storage';

export type ServeStaticFn = (folder: string, port: number) => void;

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  json: 'application/json',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  txt: 'text/plain',
} as const;

export const serveStatic: ServeStaticFn = (folder, port) => {};
