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

import { loginUserAction } from '../api';
import { LoginFormState } from '../config';

const INITIAL_STATE: LoginFormState = {
  message: '',
};

export const LoginForm: React.FC = () => {
  const usernameFieldId = React.useId();
  const passwordFieldId = React.useId();

  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RadixLabel htmlFor={usernameFieldId}>Username</RadixLabel>
            <Input
              id={usernameFieldId}
              name="identifier"
              placeholder="Username or email"
            />
            <ErrorMessage error={formState.zodErrors?.identifier} />
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
        </CardContent>

        <CardFooter className="flex flex-col">
          <AuthFormSubmitButton label="Login" />
          <ErrorMessage error={formState.strapiError} />
        </CardFooter>
      </Card>

      <div className="mt-4 text-center text-sm">
        {"Don't have an account?"}
        <NextLink className="ml-2 underline" href="/signup">
          Sign Up
        </NextLink>
      </div>
    </form>
  );
};
