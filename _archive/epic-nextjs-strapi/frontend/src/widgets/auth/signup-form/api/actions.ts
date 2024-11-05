'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { JWT_COOKIE_CONFIG } from '@/shared/auth';

import { signupFormSchema, SignupFormState } from '../config';
import { registerUser } from './services';

export const registerUserAction = async (
  _prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> => {
  const data = Object.fromEntries(formData.entries());

  const validatedData = signupFormSchema.safeParse(data);

  if (!validatedData.success) {
    const zodErrors = validatedData.error.flatten().fieldErrors;

    return {
      zodErrors,
      message: 'Invalid form data. Failed to Register',
    };
  }

  const responseData = await registerUser(validatedData.data);

  if (!responseData) {
    return {
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      strapiError: responseData.error,
      message: 'Failed to Register.',
    };
  }

  const successMessage = 'Registration is successful';

  console.log(`${successMessage}, responseData:`, responseData);

  cookies().set('jwt', responseData.jwt, JWT_COOKIE_CONFIG);
  redirect('/dashboard');
};
