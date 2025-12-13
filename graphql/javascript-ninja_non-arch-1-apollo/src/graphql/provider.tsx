import * as React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ENV } from '@/config';

export const GraphqlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apolloClient] = React.useState(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: ENV.GRAPHQL_URI }),
        cache: new InMemoryCache(),
      }),
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
