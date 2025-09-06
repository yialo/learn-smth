import { test, expect } from 'vitest';
import { Args } from './args.ts';

// @FIXME
test.skip('Args', () => {
  const inputArgs = ['true', '3080', '/usr/logs'];
  const args = new Args('l,p#,d*', inputArgs);
});
