'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const userLogoutAction = () => {
  cookies().delete('jwt');
  redirect('/');
};
