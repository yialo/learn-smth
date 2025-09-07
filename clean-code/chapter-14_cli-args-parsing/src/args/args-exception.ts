export class ArgsException extends Error {
  // @TODO Maybe add overloads?
  constructor(type: ArgsExceptionType, elementId?: string, extra?: any) {
    super();
  }

  errorMessage(): string {
    return this.toString();
  }

  setArgumentId(argumentId: string) {
    // @TODO implement
  }
}

type ArgsExceptionType =
  | 'INVALID_ARGUMENT_FORMAT'
  | 'INVALID_ARGUMENT_NAME'
  | 'UNEXPECTED_ARGUMENT'
  | 'INVALID_INTEGER'
  | 'INVALID_FLOAT'
  | 'INVALID_STRING_ARRAY'
  | 'MISSING_INTEGER'
  | 'MISSING_FLOAT'
  | 'MISSING_STRING'
  | 'MISSING_STRING_ARRAY';
