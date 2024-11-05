import { ENV } from '@/shared/config';
import { flattenStrapiAttributes } from '@/shared/lib/strapi';

export const fetchData = async (
  url: string,
  { authToken }: { authToken?: string } = {},
) => {
  try {
    const response = await fetch(url, {
      ...(authToken
        ? {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          }
        : {}),
    });
    const data = await response.json();

    return flattenStrapiAttributes(data);
  } catch (error) {
    if (ENV.NODE_ENV === 'development') {
      console.error('[getStrapiData] error', error);
    }
    throw error;
  }
};
