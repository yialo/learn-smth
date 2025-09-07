export class ArgsException extends Error {
  #errorCode: ErrorCode = 'OK';
  #errorArgumentId = '\0';
  #errorParameter: string | undefined;

  constructor(errorCode: ErrorCode);
  constructor(errorCode: ErrorCode, errorParameter: string);
  constructor(
    errorCode: ErrorCode,
    errorArgumentId: string,
    errorParameter: string,
  );
  constructor(errorCode: ErrorCode, secondParam?: string, thirdParam?: string) {
    super();
    this.#errorCode = errorCode;

    if (typeof secondParam === 'string') {
      if (typeof thirdParam === 'string') {
        this.#errorArgumentId = secondParam;
        this.#errorParameter = thirdParam;
      } else {
        this.#errorParameter = secondParam;
      }
    }
  }

  getErrorArgumentId() {
    return this.#errorArgumentId;
  }

  setErrorArgumentId(errorArgumentId: string) {
    this.#errorArgumentId = errorArgumentId;
  }

  getErrorParameter() {
    return this.#errorParameter;
  }

  setErrorParameter(errorParameter: string) {
    this.#errorParameter = errorParameter;
  }

  getErrorCode() {
    return this.#errorCode;
  }

  setErrorCode(errorCode: ErrorCode) {
    this.#errorCode = errorCode;
  }

  // @TODO add full-fledged implementation
  errorMessage(): string {
    return this.toString();

    /* switch (this.#errorCode) {
      case 'OK':
        return 'TILT: Should not get here.';
    } */
  }
}

type ErrorCode =
  | 'OK'
  | 'INVALID_ARGUMENT_FORMAT'
  | 'INVALID_ARGUMENT_NAME'
  | 'INVALID_FLOAT'
  | 'INVALID_INTEGER'
  | 'INVALID_STRING_ARRAY'
  | 'MISSING_FLOAT'
  | 'MISSING_INTEGER'
  | 'MISSING_STRING_ARRAY'
  | 'MISSING_STRING'
  | 'UNEXPECTED_ARGUMENT';
