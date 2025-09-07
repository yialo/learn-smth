import { describe, test, expect } from 'vitest';
import { Args, ArgsException } from './args.ts';

describe('Args', () => {
  const executeApplication = (...anyParams: any[]) => {
    console.log('[executeApplication]', ...anyParams);
  };

  // @FIXME
  test('happy path', () => {
    const schema = 'l,p#,c##,d*,n[*]';
    const inputArgs = [
      '-l',
      '-p',
      '3000',
      '-d',
      '/usr/logs',
      '-c',
      '6',
      '-n',
      '[Alice,Bob,Crack]',
    ];

    const args = new Args(schema, inputArgs);
    const shouldLog = args.getBoolean('l');
    const port = args.getInteger('p');
    const directory = args.getString('d');

    executeApplication(shouldLog, port, directory);
  });

  // @FIXME
  test.skip('sad path', () => {
    try {
      const schema = 'l,p#,d*';
      const inputArgs = ['-l', 'bad', '-p', '-d', '823'];

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
