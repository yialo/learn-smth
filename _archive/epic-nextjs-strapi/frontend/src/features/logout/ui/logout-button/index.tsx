'use client';

import { Button, ButtonProps } from '@/shared/ui/button';

import { userLogoutAction } from '../../api/action';

export const LogoutButton: React.FC<{
  className?: string;
  buttonProps?: ButtonProps;
}> = ({ className, buttonProps }) => {
  return (
    <form action={userLogoutAction} className={className}>
      <Button {...buttonProps} type="submit">
        Logout
      </Button>
    </form>
  );
};
