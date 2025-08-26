class Args {
  constructor(...anyParams: any[]) {}

  getBoolean(input: string): boolean {
    return Boolean(input);
  }

  getInt(input: string): number {
    return Number(input);
  }

  getString(input: string): string {
    return String(input);
  }
}

class ArgsException extends Error {
  errorMessage(): string {
    return this.toString();
  }
}

function main(...args: string[]) {
  console.log('--main---');

  try {
    const arg: Args = new Args('l,p#,d*', args);
    const logging: boolean = arg.getBoolean('l');
    const port: number = arg.getInt('p');
    const directory: string = arg.getString('d');

    executeApplication(logging, port, directory);
  } catch (error: unknown) {
    if (error instanceof ArgsException) {
      console.log('Argument error:', error.errorMessage());
    } else {
      throw error;
    }
  }
}

function executeApplication(...anyParams: any[]) {}

main('my cool args');
