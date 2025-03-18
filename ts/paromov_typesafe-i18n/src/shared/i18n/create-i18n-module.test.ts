import { describe, test, expect } from 'vitest';

import { flattenTranslations } from './create-i18n-module';

describe('flattenTranslations', () => {
  test('should work with one-level translation tree', () => {
    const tree = {
      hello: {
        en: 'hello',
        ru: 'привет',
      },
    };

    const expected = {
      'hello.en': 'hello',
      'hello.ru': 'привет',
    };

    const result = flattenTranslations(tree);

    expect(result).toEqual(expected);
  });

  test.skip('should work with two-level translation tree', () => {
    const tree = {
      section: {
        hello: {
          en: 'hello',
          ru: 'привет',
        },
      },
    };

    const expected = {
      'section.hello.en': 'hello',
      'section.hello.ru': 'привет',
    };

    const result = flattenTranslations(tree);

    expect(result).toEqual(expected);
  });
});
