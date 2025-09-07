import { describe, test, expect } from 'vitest';
import { Args, ArgsException } from './args.ts';

describe('Args', () => {
  const executeApplication = (...anyParams: any[]) => {
    console.log('[executeApplication]', ...anyParams);
  };

  // @FIXME
  test.skip('happy path', () => {
    const schema = 'l,p#,d*';
    const inputArgs = ['-l', '-p3080', '-d/usr/logs'];

    const args = new Args(schema, inputArgs);
    const shouldLog = args.getBoolean('l');
    const port = args.getInteger('p');
    const directory = args.getString('d');

    executeApplication(shouldLog, port, directory);
  });

  test.skip('sad path', () => {
    try {
      const schema = 'l,p#,d*';
      const inputArgs = ['-v', '-pBAD', '-d823'];

      const args = new Args(schema, inputArgs);
      const shouldLog = args.getBoolean('l');
      const port = args.getInteger('p');
      const directory = args.getString('d');

      executeApplication(shouldLog, port, directory);
    } catch (error) {
      if (error instanceof ArgsException) {
        console.log('Argument error:', error.errorMessage());
      } else {
        throw error;
      }
    }
  });
});
