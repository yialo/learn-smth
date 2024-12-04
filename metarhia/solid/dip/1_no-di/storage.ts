export declare class PreparedFile {
  found: boolean;
  ext: string;
  stream: NodeJS.ReadableStream;

  constructor(found: boolean, ext: string, stream: NodeJS.ReadableStream);
}

export declare class Storage {
  constructor(folder: string);

  prepare(filename: string): Promise<PreparedFile>;
}
