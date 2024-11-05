'use client';

import * as React from 'react';
import { useFormState } from 'react-dom';

import { NextLink } from '@/shared/lib/next';
import { AuthFormSubmitButton } from '@/shared/ui/auth-form-submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Input } from '@/shared/ui/input';
import { RadixLabel } from '@/shared/ui/primitives';

import { registerUserAction } from '../api';
import { SignupFormState } from '../config';

const INITIAL_STATE: SignupFormState = {
  message: '',
};

export const SignupForm: React.FC = () => {
  const usernameFieldId = React.useId();
  const emailFieldId = React.useId();
  const passwordFieldId = React.useId();
  const confirmPasswordFieldId = React.useId();

  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );

  return (
    <form action={formAction}>
      <div role="status">{formState.message}</div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RadixLabel htmlFor={usernameFieldId}>Username</RadixLabel>
            <Input
              id={usernameFieldId}
              name="username"
              placeholder="Username"
            />
            <ErrorMessage error={formState.zodErrors?.username} />
          </div>

          <div className="space-y-2">
            <RadixLabel htmlFor={emailFieldId}>Email</RadixLabel>
            <Input
              id={emailFieldId}
              name="email"
              placeholder="name@example.com"
            />
            <ErrorMessage error={formState.zodErrors?.email} />
          </div>

          <div className="space-y-2">
            <RadixLabel htmlFor={passwordFieldId}>Password</RadixLabel>
            <Input
              id={passwordFieldId}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage error={formState.zodErrors?.password} />
          </div>

          <div className="space-y-2">
            <RadixLabel htmlFor={confirmPasswordFieldId}>
              Confirm password
            </RadixLabel>
            <Input
              id={confirmPasswordFieldId}
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
            />
            <ErrorMessage error={formState.zodErrors?.passwordConfirm} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <AuthFormSubmitButton label="Sign Up" />
          <ErrorMessage error={formState.strapiError} />
        </CardFooter>
      </Card>

      <div className="mt-4 text-center text-sm">
        Have an account?
        <NextLink className="ml-2 underline" href="/login">
          Login
        </NextLink>
      </div>
    </form>
  );
};
