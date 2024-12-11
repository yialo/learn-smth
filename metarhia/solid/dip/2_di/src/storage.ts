import fs from 'node:fs';
import path from 'node:path';

import { AppStorage, PreparedFile } from './storage.types';

export class AppStorageImpl implements AppStorage {
  #folder = '';

  constructor(folder: string) {
    this.#folder = path.join(process.cwd(), folder);
  }

  async prepare(filename: string): Promise<PreparedFile> {
    const paths = [this.#folder, filename];

    if (filename.endsWith('/')) {
      paths.push('index.html');
    }

    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(this.#folder);
    const exists = await fs.promises.access(filePath).then(
      () => true,
      () => false,
    );
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : this.#folder + '/404.html';
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);

    return { found, ext, stream };
  }
}
