export interface LoggerCreator {
  (filename: string): Console;
}
