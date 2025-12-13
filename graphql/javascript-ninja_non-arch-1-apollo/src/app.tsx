import { GraphqlProvider } from '@/graphql';
import { HomePage } from '@/pages/home';

export const App: React.FC = () => {
  return (
    <GraphqlProvider>
      <HomePage />
    </GraphqlProvider>
  );
};
