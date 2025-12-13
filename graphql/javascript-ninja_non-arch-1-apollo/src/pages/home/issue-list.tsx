import { gql, useQraphqlQuery } from '@/graphql';
import { DEFAULT_PROJECT_FULL_PATH } from '@/config';

const GET_PROJECT = gql(`
  query GetProject($fullPath: ID!, $first: Int!) {
    project(fullPath: $fullPath) {
      id
      issues(first: $first) {
        nodes {
          id
          name
        }
      }
    }
  }
`);

export const IssueList: React.FC = () => {
  const { data, loading, error } = useQraphqlQuery(GET_PROJECT, {
    variables: {
      fullPath: DEFAULT_PROJECT_FULL_PATH,
      first: 3,
    },
  });

  return (
    <div>
      <h1>Infinite list</h1>
      {(() => {
        const issueNodes = data?.project?.issues?.nodes;
        if (issueNodes) {
          const meaningfulNodes = issueNodes.filter((v) => !!v);
          if (!meaningfulNodes.length) return <div>No issues</div>;
          return (
            <ul>
              {meaningfulNodes.map((issue) => (
                <li key={issue.id}>{issue.name}</li>
              ))}
            </ul>
          );
        }

        if (loading) return <div>Loading...</div>;
        if (error) return <div>`Error: ${error.message}`</div>;
      })()}
    </div>
  );
};
