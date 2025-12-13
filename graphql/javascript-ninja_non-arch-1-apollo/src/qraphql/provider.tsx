import * as React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const GRAPHQL_URI = 'https://gitlab.com/api/graphql';

export const GraphqlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apolloClient] = React.useState(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: GRAPHQL_URI }),
        cache: new InMemoryCache(),
      }),
  );

  React.useEffect(() => {
    (async () => {
      const queryResult = await apolloClient.query({
        query: gql`
          {
            project(fullPath: "gitlab-org/gitlab") {
              __typename
              id
              issues(first: 4) {
                __typename
                nodes {
                  __typename
                  id
                  name
                }
              }
            }
          }
        `,
      });

      console.log('queryResult', queryResult);
    })();
  }, [apolloClient]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
