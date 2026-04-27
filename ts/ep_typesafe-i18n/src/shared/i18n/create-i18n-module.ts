import { useLang } from './lang-context';
import { Lang } from './types';

type ObjectValues<O extends object> = O[keyof O];

type TranslationsLeaf = { [K in Lang]?: string };
type TranslationsNode = { [key: string]: TranslationsNode | TranslationsLeaf };

type TranslationKey_long<N extends TranslationsNode, P extends string = ''> = {
  [K in keyof N]: K extends string
    ? N[K] extends TranslationsNode
      ? TranslationKey_long<N[K], P extends '' ? K : `${P}.${K}`>
      : N[K] extends TranslationsLeaf
      ? P extends ''
        ? K
        : `${P}.${K}`
      : never
    : never;
}[keyof N];

type TranslationKey_short<
  TN extends TranslationsNode,
  K extends keyof TN = keyof TN,
> = K extends string
  ? TN[K] extends TranslationsNode
    ? `${K}.${TranslationKey_short<TN[K]>}`
    : K
  : never;

const testTranslations = {
  section: {
    title: {
      en: 'My title',
      ru: 'Мой заголовок',
    },
    nested: {
      block: {
        en: 'Block',
      },
    },
  },
} satisfies TranslationsNode;
type TestTranslationKey_long = TranslationKey_long<typeof testTranslations>;
type TestTranslationKey_short = TranslationKey_short<typeof testTranslations>;

export const createI18nModule = <TN extends TranslationsNode>(
  translations: TN,
) => {
  const flatTranslations = flattenTranslations(translations);

  return {
    useI18n: () => {
      const lang = useLang();

      return {
        t: (key: TranslationKey_short<TN>) =>
          flatTranslations[`${key}.${lang}`] ?? key,
      };
    },
  };
};

export const flattenTranslations = (translationsTree: TranslationsNode) => {
  const flattened: Record<string, string> = {};

  const flattenOneLevel = (
    obj: TranslationsNode | TranslationsLeaf,
    parentPath = '',
  ) => {
    for (const [key, nextLevel] of Object.entries<ObjectValues<typeof obj>>(
      obj,
    )) {
      // @NOTE Need only for constructing keys with final translations, but we need to pass this to each level
      const nextPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof nextLevel === 'string') {
        flattened[nextPath] = nextLevel;
      } else if (nextLevel) {
        flattenOneLevel(nextLevel, nextPath);
      }
    }
  };

  flattenOneLevel(translationsTree);

  return flattened;
};
