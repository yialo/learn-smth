import qs from 'qs';

import { getAuthToken } from '@/shared/auth';
import { ENV } from '@/shared/config';
import { flattenStrapiAttributes } from '@/shared/lib/strapi';

const createFailureResponseData = (error: Error | null = null) => {
  return { ok: false, date: null, error };
};

export const fetchUserMeData = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return createFailureResponseData();
  }

  const url = new URL('/api/users/me', ENV.BACKEND_ORIGIN);

  url.search = qs.stringify({
    populate: { image: { fields: ['url', 'alternativeText'] } },
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      cache: 'no-cache',
    });
    const data = await response.json();

    if (data.error) {
      return createFailureResponseData(data.error);
    }

    return flattenStrapiAttributes(data);
  } catch (error) {
    if (ENV.NODE_ENV === 'development') {
      console.error('[getStrapiData] error', error);
    }
    return createFailureResponseData(error instanceof Error ? error : null);
  }
};
