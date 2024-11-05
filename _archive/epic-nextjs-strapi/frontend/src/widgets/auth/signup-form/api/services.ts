import { ENV } from '@/shared/config';

interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  const url = new URL('/api/auth/local/register', ENV.BACKEND_ORIGIN);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    });

    return response.json();
  } catch (error) {
    console.log('Registration failed', error);
  }
};
