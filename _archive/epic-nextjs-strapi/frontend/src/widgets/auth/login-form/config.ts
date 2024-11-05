import { z } from 'zod';

export const loginFormSchema = z.object({
  identifier: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export interface LoginFormState {
  message: string;
  zodErrors?: Partial<Record<keyof LoginFormValues, string[]>>;
  strapiError?: {
    message: string;
  };
}
