import { AppStorage } from './storage.types';
import { LoggerCreator } from './logger.types';

export interface ServeStaticFn {
  (storage: AppStorage, logger: ReturnType<LoggerCreator>, port: number): void;
}
