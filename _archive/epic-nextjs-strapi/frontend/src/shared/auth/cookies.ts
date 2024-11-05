import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { ENV } from '@/shared/config';

export const JWT_COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24,
  secure: ENV.NODE_ENV === 'production',
  path: '/',
  httpOnly: true,
} satisfies Partial<ResponseCookie>;

export const getAuthToken = () => {
  const authToken = cookies().get('jwt')?.value;
  return authToken;
};
