import { useLang } from './lang-context';

export const createI18nModule = (tree: any) => {
  const flattenTree = flattenTranslations(tree);

  return {
    useI18n: () => {
      const lang = useLang();

      return {
        t: (key: string) => flattenTree[`${key}.${lang}`] ?? key,
      };
    },
  };
};

export const flattenTranslations = (tree: any) => {
  const output: Record<string, any> = {};

  /* const flatten = (obj: any, path = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !!value) {
        output[key] = flatten(value);
      } else {
        const jointKey = `${key}.${value}`;
        output[jointKey] = tree[key];
      }
    }
  };

  flatten(tree); */

  // Case: One-level tree

  for (const [path, subtree] of Object.entries(tree)) {
    for (const [lang, translation] of Object.entries(subtree as object)) {
      const pathWithLang = `${path}.${lang}`;
      output[pathWithLang] = translation;
    }
  }

  return output;
};
