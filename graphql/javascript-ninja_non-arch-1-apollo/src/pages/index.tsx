import * as React from 'react';
import { gql, useQraphqlQuery } from '../qraphql';

const GET_PROJECT = gql`
  {
    project(fullPath: "gitlab-org/gitlab") {
      __typename
      id
      issues(first: 2) {
        __typename
        nodes {
          __typename
          id
          name
        }
      }
    }
  }
`;

export const HomePage: React.FC = () => {
  const { data, loading, error } = useQraphqlQuery(GET_PROJECT);

  return (
    <div>
      <h1>Infinite list</h1>
      {(() => {
        if (data) {
          const projectData = data as any;
          return (
            <ul>
              {projectData.project.issues.nodes.map((issue: any) => (
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
