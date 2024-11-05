import { z } from 'zod';

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username cannot be shorter than 3 characters')
      .max(20, 'Username cannot be longer than 20 characters'),
    email: z
      .string()
      .min(1, 'Email address cannot be empty')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password cannot be shorter than 8 characters')
      .max(64, 'Password cannot be longer than 64 characters')
      .regex(
        /[^1-9]\d/,
        'Password must contain at least one letter and one number',
      ),
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine(
    (data) => {
      if (!data.passwordConfirm) return true;
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords must match',
      path: ['passwordConfirm'],
    },
  );

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export interface SignupFormState {
  message: string;
  zodErrors?: Partial<Record<keyof SignupFormValues, string[]>>;
  strapiError?: {
    message: string;
  };
}
