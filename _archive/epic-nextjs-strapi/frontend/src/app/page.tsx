import { FeaturesSection } from '@/entities/features-section';
import { HeroSection } from '@/entities/hero-section';
import { fetchHomePageData } from '@/shared/api';

const renderBlock = (block: any) => {
  if (block.__component === 'layouts.hero-section') {
    return <HeroSection key={block.id} data={block} />;
  }
  if (block.__component === 'layouts.features-section') {
    return <FeaturesSection key={block.id} data={block} />;
  }
  return null;
};

const Home: React.FC = async () => {
  const data = await fetchHomePageData();

  const { blocks } = data;

  if (!blocks) {
    return <p>No sections found.</p>;
  }

  return <main>{blocks.map(renderBlock)}</main>;
};

export default Home;
