import { IssueForm } from './issue-form';
import { IssueList } from './issue-list';

export const HomePage: React.FC = () => {
  return (
    <div>
      <IssueList />
      <hr />
      <IssueForm />
    </div>
  );
};
