'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { JWT_COOKIE_CONFIG } from '@/shared/auth';

import { loginFormSchema, LoginFormState } from '../config';
import { loginUser } from './services';

export const loginUserAction = async (
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const data = Object.fromEntries(formData.entries());

  const validatedData = loginFormSchema.safeParse(data);

  if (!validatedData.success) {
    const zodError = validatedData.error.flatten();

    return {
      zodErrors: zodError.fieldErrors,
      message: 'Invalid form data. Failed to Login',
    };
  }

  const responseData = await loginUser(validatedData.data);

  if (!responseData) {
    return {
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      strapiError: responseData.error,
      message: 'Failed to Login.',
    };
  }

  const successMessage = 'Login is successful';

  console.log(`${successMessage}, responseData:`, responseData);

  cookies().set('jwt', responseData.jwt, JWT_COOKIE_CONFIG);
  redirect('/dashboard');
};
