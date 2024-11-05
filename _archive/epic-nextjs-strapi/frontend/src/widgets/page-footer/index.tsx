import { cn } from '@/shared/lib/cn';
import { NextLink } from '@/shared/lib/next';
import { AppLogo } from '@/shared/ui/app-logo';
import { GitHubIcon, TwitterIcon, YouTubeIcon } from '@/shared/ui/icons';

const getIconComponentBySocialName = (socialName: string) => {
  return {
    GitHub: GitHubIcon,
    Twitter: TwitterIcon,
    YouTube: YouTubeIcon,
  }[socialName];
};

export const PageFooter: React.FC<{
  className?: string;
  data: {
    logo: {
      url: string;
      text: string;
    };
    text: string;
    socialLink: {
      id: number;
      url: string;
      text: string;
      isExternal: true;
    }[];
  };
}> = ({ className, data }) => {
  const { logo, text, socialLink } = data;

  return (
    <footer
      className={cn(
        'flex items-center justify-between gap-x-4 bg-slate-800 p-4',
        className,
      )}
    >
      <AppLogo href={logo.url} label={logo.text} />
      <p className="text-white">{text}</p>
      <ul className="flex gap-x-4">
        {socialLink.map(({ id, url, text, isExternal }) => {
          const Icon = getIconComponentBySocialName(text);

          return (
            <li key={id}>
              <NextLink
                href={url}
                aria-label={`Visit us at ${text}`}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
              >
                {Icon && <Icon className="text-white" />}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
