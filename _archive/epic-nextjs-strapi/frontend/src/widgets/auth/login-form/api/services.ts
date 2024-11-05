import { ENV } from '@/shared/config';

interface LoginUserPayload {
  identifier: string;
  password: string;
}

export const loginUser = async (payload: LoginUserPayload) => {
  const url = new URL('/api/auth/local', ENV.BACKEND_ORIGIN);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Login failed', error);
  }
};
