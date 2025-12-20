import * as React from 'react';
import { gql, useQraphqlQuery } from '@/graphql';
import { DEFAULT_PROJECT_FULL_PATH } from '@/config';

const GET_PROJECT = gql(`
  query GetProject($fullPath: ID!, $first: Int!, $after: String) {
    project(fullPath: $fullPath) {
      id
      issues(sort: MILESTONE_DUE_DESC, first: $first, after: $after) {
        nodes {
          id
          iid
          name
          webUrl
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`);

export const IssueList: React.FC = () => {
  const { data, loading, fetchMore, error } = useQraphqlQuery(GET_PROJECT, {
    variables: {
      fullPath: DEFAULT_PROJECT_FULL_PATH,
      first: 3,
      after: null,
    },
  });

  const loadNextPage = () => {
    console.log('endCursor', data?.project?.issues?.pageInfo.endCursor);
    fetchMore({
      variables: {
        after: data?.project?.issues?.pageInfo.endCursor,
      },
    });
  };

  return (
    <div>
      <h1>Infinite list</h1>
      {(() => {
        const issueNodes = data?.project?.issues?.nodes;
        if (issueNodes) {
          const meaningfulNodes = issueNodes.filter((v) => !!v);
          if (!meaningfulNodes.length) return <div>No issues</div>;
          return (
            <>
              <ul>
                {meaningfulNodes.map((issue) => (
                  <li key={issue.id}>{issue.name}</li>
                ))}
              </ul>
              <React.Activity
                mode={
                  data?.project?.issues?.pageInfo.hasNextPage
                    ? 'visible'
                    : 'hidden'
                }
              >
                <button type="button" onClick={loadNextPage}>
                  Load more
                </button>
              </React.Activity>
            </>
          );
        }

        if (loading) return <div>Loading...</div>;
        if (error) return <div>`Error: ${error.message}`</div>;
      })()}
    </div>
  );
};
