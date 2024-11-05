import { cn } from '@/shared/lib/cn';
import { NextLink } from '@/shared/lib/next';

const MountainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
};

export const AppLogo: React.FC<{
  dark?: boolean;
  href: string;
  label: string;
  noScroll?: true;
}> = ({ dark, href, label, noScroll }) => {
  return (
    <NextLink
      href={href}
      className={cn(
        'flex items-center gap-x-2',
        dark ? 'text-slate-900' : 'text-white',
      )}
      scroll={!noScroll}
    >
      <MountainIcon className="h-6 w-6" />
      <span className="text-lg font-semibold">{label}</span>
    </NextLink>
  );
};
