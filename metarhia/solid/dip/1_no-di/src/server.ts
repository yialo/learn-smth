import { createServer } from 'node:http';
import { logger } from './logger';
import { AppStorage } from './storage';

export type ServeStaticFn = (folder: string, port: number) => void;

const MIME_TYPES: { default: string; [key: string]: string } = {
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
};

export const serveStatic: ServeStaticFn = (folder, port) => {
  const storage = new AppStorage(folder);

  const server = createServer(async (req, res) => {
    const file = await storage.prepare(req.url ?? '');
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] ?? MIME_TYPES.default;

    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    logger.log(
      `[${getFormattedDateNow()}] ${req.method} ${req.url} ${statusCode}`,
    );
  });

  server.listen(port);
};

const getFormattedDateNow = () => {
  const now = new Date();

  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}_${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};
