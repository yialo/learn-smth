import { GraphqlProvider } from './qraphql';
import { HomePage } from './pages';

export const App: React.FC = () => {
  return (
    <GraphqlProvider>
      <HomePage />
    </GraphqlProvider>
  );
};
