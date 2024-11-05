import { useFormStatus } from 'react-dom';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

export const AuthFormSubmitButton: React.FC<{
  label: string;
}> = ({ label }) => {
  const formStatus = useFormStatus();
  const { pending } = formStatus;

  return (
    <Button
      className={cn('w-full', pending && 'opacity-50')}
      type="submit"
      aria-disabled={pending}
    >
      {label}
    </Button>
  );
};
