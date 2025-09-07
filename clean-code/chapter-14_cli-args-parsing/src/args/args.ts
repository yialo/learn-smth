import { ArgListIterator } from './arg-list-iterator.ts';
import { isLowercaseLatinLetter } from './utils.ts';

export class Args {
  #marshalers = new Map<string, ArgumentMarshaler>();
  #argsFound = new Set<string>();
  #argListIterator: ArgListIterator;

  constructor(schema: string, inputArgs: string[]) {
    this.#argListIterator = new ArgListIterator(inputArgs);

    this.#parseSchema(schema);
    this.#parseArgumentStrings();
  }

  #parseSchema(schema: string): void {
    for (const element of schema.split(',')) {
      if (element.length > 0) {
        this.#parseSchemaElement(element.trim());
      }
    }
  }

  #parseSchemaElement(element: string): void {
    const elementId: string = element.charAt(0);
    const elementTail: string = element.substring(1);

    this.#validateSchemaElementId(elementId);

    if (elementTail.length === 0) {
      this.#marshalers.set(elementId, new BooleanArgumentMarshaler());
    } else if (elementTail === '*') {
      this.#marshalers.set(elementId, new StringArgumentMarshaler());
    } else if (elementTail === '#') {
      this.#marshalers.set(elementId, new IntegerArgumentMarshaler());
    } else if (elementTail === '##') {
      this.#marshalers.set(elementId, new FloatArgumentMarshaler());
    } else if (elementTail === '[*]') {
      this.#marshalers.set(elementId, new StringArrayArgumentMarshaler());
    } else {
      throw new ArgsException(
        'INVALID_ARGUMENT_FORMAT',
        elementId,
        elementTail,
      );
    }
  }

  #validateSchemaElementId(elementId: string): void {
    if (!isLowercaseLatinLetter(elementId)) {
      throw new ArgsException('INVALID_ARGUMENT_NAME', elementId, null);
    }
  }

  #parseArgumentStrings(): void {
    while (this.#argListIterator.hasNext()) {
      const argString = this.#argListIterator.next();
      if (argString?.startsWith('-')) {
        this.#parseArgumentCharacters(argString.substring(1));
      } else {
        this.#argListIterator.previous();
        break;
      }
    }
  }

  #parseArgumentCharacters(argChars: string): void {
    for (let i = 0; i < argChars.length; i++) {
      const argChar = argChars.charAt(i);
      this.#parseArgumentCharacter(argChar);
    }
  }

  #parseArgumentCharacter(argChar: string) {
    const marshaler = this.#marshalers.get(argChar);
    if (!marshaler) {
      throw new ArgsException('UNEXPECTED_ARGUMENT', argChar, null);
    }

    this.#argsFound.add(argChar);

    try {
      marshaler.set(this.#argListIterator);
    } catch (error) {
      if (error instanceof ArgsException) {
        error.setArgumentId(argChar);
      }
    }
  }

  has(arg: string): boolean {
    return this.#argsFound.has(arg);
  }

  nextArgumentIndex(): number {
    return this.#argListIterator.nextIndex();
  }

  getBoolean(arg: string): boolean {
    return BooleanArgumentMarshaler.getValue(this.#marshalers.get(arg));
  }

  getInteger(arg: string): number {
    return IntegerArgumentMarshaler.getValue(this.#marshalers.get(arg));
  }

  getFloat(arg: string): number {
    return FloatArgumentMarshaler.getValue(this.#marshalers.get(arg));
  }

  getString(arg: string): string {
    return StringArgumentMarshaler.getValue(this.#marshalers.get(arg));
  }

  getStringArray(arg: string): string[] {
    return StringArrayArgumentMarshaler.getValue(this.#marshalers.get(arg));
  }
}

interface ArgumentMarshaler {
  set(argListIterator: ArgListIterator): void;
}

class BooleanArgumentMarshaler implements ArgumentMarshaler {
  #booleanValue = false;

  static getValue(am: ArgumentMarshaler | undefined): boolean {
    if (am instanceof BooleanArgumentMarshaler) {
      return am.#booleanValue;
    }
    return false;
  }

  set() {
    this.#booleanValue = true;
  }
}

class StringArgumentMarshaler implements ArgumentMarshaler {
  #stringValue = '';

  static getValue(am: ArgumentMarshaler | undefined): string {
    return '';
  }

  set(argListIterator: ArgListIterator) {}
}

class IntegerArgumentMarshaler implements ArgumentMarshaler {
  static getValue(am: ArgumentMarshaler | undefined): number {
    return 0;
  }

  set(argListIterator: ArgListIterator) {}
}

class FloatArgumentMarshaler implements ArgumentMarshaler {
  static getValue(am: ArgumentMarshaler | undefined): number {
    return 1.5;
  }

  set(argListIterator: ArgListIterator) {}
}

class StringArrayArgumentMarshaler implements ArgumentMarshaler {
  static getValue(am: ArgumentMarshaler | undefined): string[] {
    return [];
  }

  set(argListIterator: ArgListIterator) {}
}

export class ArgsException extends Error {
  // @TODO Is 'extra' optional?
  constructor(type: ArgsExceptionType, elementId: string, extra: any) {
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
  | 'UNEXPECTED_ARGUMENT';
