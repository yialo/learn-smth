import { ENV } from '@/shared/config';
import { NextLink } from '@/shared/lib/next';
import { StrapiImage } from '@/shared/ui/strapi-image';

interface Image {
  id: number;
  url: string;
  alternativeText: string | null;
}

interface Link {
  id: number;
  url: string;
  text: string;
}

interface DataProp {
  id: number;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

export const HeroSection: React.FC<{ data: DataProp }> = ({
  data: { heading, subHeading, image, link },
}) => {
  const imageSrc = ENV.BACKEND_ORIGIN + image.url;

  return (
    <header className="relative h-[600px] overflow-hidden">
      <StrapiImage
        src={imageSrc}
        alt={image.alternativeText ?? 'Hero'}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/20 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading}</p>
        <NextLink
          href={link.url}
          className="mt-8 rounded-md bg-white px-6 py-3 text-base font-medium text-black shadow hover:bg-gray-100"
        >
          {link.text}
        </NextLink>
      </div>
    </header>
  );
};
