import fs from 'node:fs';
import path from 'node:path';
import { Console } from 'node:console';

import { LoggerCreator } from '../logger.types';

export const createFileLogger: LoggerCreator = (filename) => {
  const filePath = path.join(process.cwd(), 'logs', filename);
  const fileStream = fs.createWriteStream(filePath);

  return new Console({ stdout: fileStream });
};
