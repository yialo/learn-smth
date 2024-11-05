import { NextImage } from '@/shared/lib/next';
import { getStrapiMedia } from '@/shared/lib/strapi';

export const StrapiImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}> = ({ src, alt, width, height, className, priority }) => {
  if (!src) return null;

  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <NextImage
      src={imageUrl ?? imageFallback}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
};
