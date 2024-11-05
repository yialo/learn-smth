import { LogoutButton } from '@/features/logout';
import { getAuthToken } from '@/shared/auth';
import { NextLink } from '@/shared/lib/next';
import { AppLogo } from '@/shared/ui/app-logo';

export const PageHeader: React.FC<{
  data: {
    logo: {
      url: string;
      text: string;
    };
    ctaButton: {
      url: string;
      text: string;
    };
  };
}> = ({ data: { ctaButton, logo } }) => {
  const authToken = getAuthToken();

  return (
    <header className="flex items-center justify-between gap-x-4 p-4 shadow-md">
      <AppLogo href={logo.url} label={logo.text} dark noScroll />
      {authToken ? (
        <LogoutButton
          buttonProps={{
            variant: 'secondary',
          }}
        />
      ) : (
        <NextLink
          href={ctaButton.url}
          className="rounded-md bg-green-600 px-4 py-2 text-white"
          scroll={false}
        >
          {ctaButton.text}
        </NextLink>
      )}
    </header>
  );
};
