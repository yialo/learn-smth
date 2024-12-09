import fs from 'node:fs';
import path from 'node:path';

interface IPreparedFile {
  found: boolean;
  ext: string;
  stream: NodeJS.ReadableStream;
}

class PreparedFileImpl implements IPreparedFile {
  constructor(
    public found: boolean,
    public ext: string,
    public stream: NodeJS.ReadableStream,
  ) {}
}

interface IAppStorage {
  prepare(filename: string): Promise<IPreparedFile>;
}

export class AppStorage implements IAppStorage {
  #folder = '';

  constructor(folder: string) {
    this.#folder = folder;
  }

  async prepare(filename: string): Promise<IPreparedFile> {
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

    return new PreparedFileImpl(found, ext, stream);
  }
}
