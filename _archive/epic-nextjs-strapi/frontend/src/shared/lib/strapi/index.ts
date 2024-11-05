import { ENV } from '@/shared/config';

export const flattenStrapiAttributes = (
  data: Record<string, any>,
): Record<string, any> => {
  if (
    typeof data !== 'object' ||
    data === null ||
    data instanceof Date ||
    typeof data === 'function'
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(flattenStrapiAttributes);
  }

  const flattened: Record<string, any> = {};

  for (const key in data) {
    if (!Object.hasOwn(data, key)) continue;

    if (
      (key === 'attributes' || key === 'data') &&
      typeof data[key] === 'object' &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenStrapiAttributes(data[key]));
    } else {
      flattened[key] = flattenStrapiAttributes(data[key]);
    }
  }

  return flattened;
};

export const getStrapiMedia = (url: string | null) => {
  if (url === null) return '';

  if (['data:', 'http', '//'].some((prefix) => url.startsWith(prefix)))
    return url;

  return ENV.BACKEND_ORIGIN + url;
};
