import { LoggerCreator } from '../logger.types';

export const createConsoleLogger: LoggerCreator = () => {
  return globalThis.console;
};
