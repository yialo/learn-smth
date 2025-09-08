import {
  ArgListIterator,
  NoSuchElementException,
} from './arg-list-iterator.ts';
import { ArgsException } from './args-exception.ts';

export interface ArgumentMarshaler {
  set(argListIterator: ArgListIterator): void;
}

export class BooleanArgumentMarshaler implements ArgumentMarshaler {
  #booleanValue = false;

  set() {
    this.#booleanValue = true;
  }

  static getValue(am: ArgumentMarshaler | undefined): boolean {
    if (am instanceof BooleanArgumentMarshaler) {
      return am.#booleanValue;
    }
    return false;
  }
}

export class StringArgumentMarshaler implements ArgumentMarshaler {
  #stringValue = '';

  set(argListIterator: ArgListIterator) {
    try {
      this.#stringValue = argListIterator.next();
    } catch (error) {
      if (error instanceof NoSuchElementException) {
        throw new ArgsException('MISSING_STRING');
      }
    }
  }

  static getValue(am: ArgumentMarshaler | undefined): string {
    if (am instanceof StringArgumentMarshaler) {
      return am.#stringValue;
    }
    return '';
  }
}

export class IntegerArgumentMarshaler implements ArgumentMarshaler {
  #intValue = 0;

  set(argListIterator: ArgListIterator) {
    try {
      const argListElement = argListIterator.next();
      const parsedArg = Number.parseInt(argListElement);

      if (!Number.isInteger(parsedArg)) {
        throw new ArgsException('INVALID_INTEGER');
      }
      this.#intValue = parsedArg;
    } catch (error) {
      if (error instanceof ArgsException) throw error;
      if (error instanceof NoSuchElementException) {
        throw new ArgsException('MISSING_INTEGER');
      }
    }
  }

  static getValue(am: ArgumentMarshaler | undefined): number {
    if (am instanceof IntegerArgumentMarshaler) {
      return am.#intValue;
    }
    return 0;
  }
}

export class FloatArgumentMarshaler implements ArgumentMarshaler {
  #floatValue = 0;

  set(argListIterator: ArgListIterator) {
    try {
      const argListElement = argListIterator.next();
      const parsedArg = Number.parseFloat(argListElement);

      if (Number.isNaN(parsedArg)) {
        throw new ArgsException('INVALID_FLOAT');
      }
      this.#floatValue = parsedArg;
    } catch (error) {
      if (error instanceof NoSuchElementException) {
        throw new ArgsException('MISSING_FLOAT');
      }
    }
  }

  static getValue(am: ArgumentMarshaler | undefined): number {
    if (am instanceof FloatArgumentMarshaler) {
      return am.#floatValue;
    }
    return 0;
  }
}

export class StringArrayArgumentMarshaler implements ArgumentMarshaler {
  #stringArrayValue: string[] = [];

  set(argListIterator: ArgListIterator) {
    try {
      const argListElement = argListIterator.next();
      const opener = argListElement.at(0);
      const closer = argListElement.at(-1);

      if (opener !== '[' || closer !== ']') {
        throw new ArgsException('INVALID_STRING_ARRAY');
      }

      const argSeries = argListElement.slice(1, -1);
      const argArray = argSeries.split(',');
      this.#stringArrayValue = argArray;
    } catch (error) {
      if (error instanceof ArgsException) throw error;
      if (error instanceof NoSuchElementException) {
        throw new ArgsException('MISSING_STRING_ARRAY');
      }
    }
  }

  static getValue(am: ArgumentMarshaler | undefined): string[] {
    if (am instanceof StringArrayArgumentMarshaler) {
      return am.#stringArrayValue;
    }
    return [];
  }
}
