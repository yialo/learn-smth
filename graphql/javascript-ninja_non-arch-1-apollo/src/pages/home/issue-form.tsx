import * as React from 'react';
import { gql, useQraphqlClient } from '@/graphql';
import { DEFAULT_PROJECT_FULL_PATH } from '@/config';

const MIN_ISSUE_NUMBER = 1;
const MAX_ISSUE_NUMBER = 4;

const GET_ISSUE_BY_ID = gql(`
  query GetIssueById($id: IssueID!) {
    issue(id: $id) {
      id
      title
    }
  }
`);

const GET_PROJECT_ISSUE_BY_IID = gql(`
  query GetProjectIssueByIid($fullPath: ID!, $iid: String!) {
    project(fullPath: $fullPath) {
      id
      issue(iid: $iid) {
        id
        title
      }
    }
  }
`);

const ISSUE_NUMBER_TO_ID: Record<number, string> = {
  1: 'gid://gitlab/Issue/178714219',
  2: 'gid://gitlab/Issue/178712968',
  3: 'gid://gitlab/Issue/178700670',
  4: 'gid://gitlab/Issue/178700245',
};

const DEFAULT_ISSUE_IID = '584029';

const ISSUE_QUERY_TYPES = ['project', 'standalone'] as const;
type IssueQueryType = (typeof ISSUE_QUERY_TYPES)[number];

export const IssueForm: React.FC = () => {
  const [issueNumber, setIssueNumber] = React.useState(1);
  const [issueQueryType, setIssueQueryType] =
    React.useState<IssueQueryType>('project');

  const graphqlClient = useQraphqlClient();
  const callStandaloneIssueQuery = () => {
    const issueId = ISSUE_NUMBER_TO_ID[issueNumber] ?? ISSUE_NUMBER_TO_ID[1];
    return graphqlClient.query({
      query: GET_ISSUE_BY_ID,
      variables: {
        id: issueId,
      },
    });
  };
  type StandaloneIssueQueryResult = Awaited<
    ReturnType<typeof callStandaloneIssueQuery>
  >;
  const [standaloneIssueQueryResult, setStandaloneIssueQueryResult] =
    React.useState<StandaloneIssueQueryResult | null>(null);

  const callProjectIssueQuery = () => {
    return graphqlClient.query({
      query: GET_PROJECT_ISSUE_BY_IID,
      variables: {
        fullPath: DEFAULT_PROJECT_FULL_PATH,
        iid: DEFAULT_ISSUE_IID,
      },
    });
  };
  type ProjectIssueQueryResult = Awaited<
    ReturnType<typeof callProjectIssueQuery>
  >;
  const [projectIssueQueryResult, setProjectIssueQueryResult] =
    React.useState<ProjectIssueQueryResult | null>(null);

  const handleRequestButtonClick = async () => {
    if (issueQueryType === 'project') {
      const result = await callProjectIssueQuery();
      setProjectIssueQueryResult(result);
    } else {
      const result = await callStandaloneIssueQuery();
      setStandaloneIssueQueryResult(result);
    }
  };

  const issueTitle =
    (issueQueryType === 'project'
      ? projectIssueQueryResult?.data?.project?.issue?.title
      : standaloneIssueQueryResult?.data?.issue?.title) ?? '';

  return (
    <div>
      <div
        style={{
          display: 'grid',
          marginBlockEnd: '0.5rem',
        }}
      >
        {ISSUE_QUERY_TYPES.map((iqt) => (
          <label key={iqt}>
            <input
              type="radio"
              name="issue-query-type"
              value={iqt}
              checked={iqt === issueQueryType}
              onChange={(event) =>
                setIssueQueryType(event.target.value as IssueQueryType)
              }
            />
            <span>{iqt}</span>
          </label>
        ))}
      </div>

      <button type="button" onClick={handleRequestButtonClick}>
        {(() => {
          if (issueQueryType === 'project') return 'Load issue title';
          return `Load issue #${issueNumber} title`;
        })()}
      </button>
      {issueQueryType === 'standalone' && (
        <input
          type="number"
          aria-label="Set issue number"
          value={issueNumber}
          onChange={(event) => {
            const asNumber = Number(event.target.value);
            const isNumberAllowed =
              asNumber >= MIN_ISSUE_NUMBER && asNumber <= MAX_ISSUE_NUMBER;
            if (isNumberAllowed) setIssueNumber(asNumber);
          }}
        />
      )}

      <div
        style={{
          paddingBlockStart: '0.75rem',
        }}
      >
        {`Issue title: ${issueTitle}`}
      </div>
    </div>
  );
};
