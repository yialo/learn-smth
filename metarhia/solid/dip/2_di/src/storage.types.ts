export interface PreparedFile {
  found: boolean;
  ext: string;
  stream: NodeJS.ReadableStream;
}

export interface AppStorage {
  prepare(filename: string): Promise<PreparedFile>;
}
