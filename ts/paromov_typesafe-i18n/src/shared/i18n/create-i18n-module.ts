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

export const flattenTranslations = (tree: Record<string, any>) => {
  const flattened: Record<string, any> = {};

  const flattenOneLevel = (level: object, parentPath: string = '') => {
    for (const [key, nextLevel] of Object.entries(level)) {
      const nextPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof nextLevel === 'string') {
        flattened[nextPath] = nextLevel;
      } else {
        flattenOneLevel(nextLevel, nextPath);
      }
    }
  };

  flattenOneLevel(tree);

  return flattened;
};
