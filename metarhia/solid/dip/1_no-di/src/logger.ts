import fs from 'node:fs';
import path from 'node:path';
import { Console } from 'node:console';
import { PassThrough } from 'node:stream';

const createLogger = (filename: string): Console => {
  const filePath = path.join(process.cwd(), 'logs', filename);
  const fileStream = fs.createWriteStream(filePath);

  const passThrough = new PassThrough();
  passThrough.pipe(fileStream);
  passThrough.pipe(process.stdout);

  return new Console({ stdout: passThrough });
};

export const logger = createLogger('access.log');
