import { describe, test, expect } from 'vitest';

import { flattenTranslations } from './create-i18n-module';

describe('flattenTranslations', () => {
  test.skip('should work with zero-level translation tree', () => {
    const tree = {
      en: 'Hello',
      ru: 'Привет',
    };

    const expected = {
      en: 'Hello',
      ru: 'Привет',
    };

    const result = flattenTranslations(tree);

    expect(result).toEqual(expected);
  });

  test('should work with one-level translation tree', () => {
    const tree = {
      hello: {
        en: 'Hello',
        ru: 'Привет',
      },
    };

    const expected = {
      'hello.en': 'Hello',
      'hello.ru': 'Привет',
    };

    const result = flattenTranslations(tree);

    expect(result).toEqual(expected);
  });

  test('should work with two-level translation tree', () => {
    const tree = {
      section: {
        hello: {
          en: 'Hello',
          ru: 'Привет',
        },
      },
    };

    const expected = {
      'section.hello.en': 'Hello',
      'section.hello.ru': 'Привет',
    };

    const result = flattenTranslations(tree);

    expect(result).toEqual(expected);
  });
});
