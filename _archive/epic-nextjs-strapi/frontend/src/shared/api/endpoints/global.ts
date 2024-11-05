import qs from 'qs';

import { ENV } from '@/shared/config';

import { fetchData } from '../fetcher';

export const fetchGlobalData = () => {
  const url = new URL('/api/global', ENV.BACKEND_ORIGIN);

  url.search = qs.stringify({
    populate: [
      'header.logo',
      'header.ctaButton',
      'footer.logo',
      'footer.socialLink',
    ],
  });

  return fetchData(url.href);
};

export const fetchGlobalAppMetadata = () => {
  const url = new URL('/api/global', ENV.BACKEND_ORIGIN);

  url.search = qs.stringify({
    fields: ['title', 'description'],
  });

  return fetchData(url.href);
};
