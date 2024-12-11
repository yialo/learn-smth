import fs from 'node:fs';
import path from 'node:path';
import { Console } from 'node:console';
import { PassThrough } from 'node:stream';

import { LoggerCreator } from '../logger.types';

export const createPassThroughLogger: LoggerCreator = (filename) => {
  const filePath = path.join(process.cwd(), 'logs', filename);
  const fileStream = fs.createWriteStream(filePath);

  const passThrough = new PassThrough();
  passThrough.pipe(fileStream);
  passThrough.pipe(process.stdout);

  return new Console({ stdout: passThrough });
};
