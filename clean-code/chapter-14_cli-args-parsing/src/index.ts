import { Args, ArgsException } from './args/args.ts';

function main(inputArgs: string[]) {
  console.log('---main---');

  try {
    const args: Args = new Args('l,p#,d*', inputArgs);
    const logging: boolean = args.getBoolean('l');
    const port: number = args.getInteger('p');
    const directory: string = args.getString('d');

    executeApplication(logging, port, directory);
  } catch (error: unknown) {
    if (error instanceof ArgsException) {
      console.log('Argument error:', error.errorMessage());
    } else {
      throw error;
    }
  }
}

function executeApplication(...anyParams: any[]) {
  console.log('---executeApplication---', ...anyParams);
}

main(['true', '3080', '/usr/logs']);
