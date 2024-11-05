import { CheckIcon, ClockIcon, CloudIcon } from '@/shared/ui/icons';

const getIconComponentByName = (iconName: string) => {
  return {
    CLOCK_ICON: ClockIcon,
    CHECK_ICON: CheckIcon,
    CLOUD_ICON: CloudIcon,
  }[iconName];
};

interface Feature {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

export const FeaturesSection: React.FC<{
  data: {
    title: string;
    description: string;
    feature: Feature[];
  };
}> = ({ data: { title, description, feature: features } }) => {
  return (
    <section
      aria-label={title}
      // eslint-disable-next-line jsx-a11y/aria-props
      aria-description={description}
      className="flex px-4 py-12 max-sm:flex-col max-sm:gap-y-12 sm:justify-center sm:gap-x-6"
    >
      {features.map(({ id, heading, subHeading, icon }) => {
        const Icon = getIconComponentByName(icon);

        return (
          <div key={id} className="flex flex-col items-center gap-y-2 p-1">
            {Icon && <Icon />}
            <div className="text-center text-lg font-bold lg:text-2xl">
              {heading}
            </div>
            <p className="w-full text-center text-gray-500 max-lg:text-sm">
              {subHeading}
            </p>
          </div>
        );
      })}
    </section>
  );
};
