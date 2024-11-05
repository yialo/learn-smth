import qs from 'qs';

import { ENV } from '@/shared/config';

import { fetchData } from '../fetcher';

const queryString = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        },
      },
    },
  },
});

export const fetchHomePageData = () => {
  const url = new URL('/api/home-page', ENV.BACKEND_ORIGIN);
  url.search = queryString;

  return fetchData(url.href);
};
