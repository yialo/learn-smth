import { describe, test, expect } from 'vitest';
import { Args } from './args.ts';

describe('Args', () => {
  const logParams = (...anyParams: any[]) => {
    console.log('[logParams]', JSON.stringify(anyParams, null, 2));
  };

  test('separate flags', () => {
    const schema = 'l,p#,t##,d*,n[*]';
    const inputArgs = [
      '-l',
      '-p',
      '3000',
      '-d',
      '/usr/logs',
      '-t',
      '27.5',
      '-n',
      '[Alice,Bob,Clark]',
    ];

    const args = new Args(schema, inputArgs);
    const shouldLog = args.getBoolean('l');
    const port = args.getInteger('p');
    const directory = args.getString('d');
    const temperature = args.getFloat('t');
    const names = args.getStringArray('n');

    logParams({ shouldLog, port, directory, temperature, names });

    expect(shouldLog).toBe(true);
    expect(port).toBe(3000);
    expect(directory).toBe('/usr/logs');
    expect(temperature).toBe(27.5);
    expect(names).toEqual(['Alice', 'Bob', 'Clark']);
  });

  test('joint flags', () => {
    const schema = 'l,p#,t##,d*,n[*]';
    const inputArgs = [
      '-lndpt',
      '[Alice,Bob,Clark]',
      '/usr/logs',
      '3000',
      '27.5',
    ];

    const args = new Args(schema, inputArgs);
    const shouldLog = args.getBoolean('l');
    const port = args.getInteger('p');
    const directory = args.getString('d');
    const temperature = args.getFloat('t');
    const names = args.getStringArray('n');

    logParams({ shouldLog, port, directory, temperature, names });

    expect(shouldLog).toBe(true);
    expect(port).toBe(3000);
    expect(directory).toBe('/usr/logs');
    expect(temperature).toBe(27.5);
    expect(names).toEqual(['Alice', 'Bob', 'Clark']);
  });

  test('wrong: args input without any flags', () => {
    const schema = 'l,p#,t##,d*,n[*]';
    const inputArgs = ['bad'];

    const args = new Args(schema, inputArgs);
    const shouldLog = args.getBoolean('l');
    const port = args.getInteger('p');
    const directory = args.getString('d');
    const temperature = args.getFloat('t');
    const names = args.getStringArray('n');

    logParams({ shouldLog, port, directory, temperature, names });

    expect(shouldLog).toBe(false);
    expect(port).toBe(0);
    expect(directory).toBe('');
    expect(temperature).toBe(0);
    expect(names).toEqual([]);
  });
});
