import { PermissionsProvider } from '../permissions';
import { SessionProvider, useUserId } from '../session';
import { TaskList, TasksProvider } from '../tasks';
import { createPermissionsApiClient, useTasksApiClient } from './api';

const TasksPermissionsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <TasksProvider apiClient={useTasksApiClient(useUserId())}>
      {children}
    </TasksProvider>
  );
};

const permissionsApiClient = createPermissionsApiClient();

export const App: React.FC = () => {
  return (
    <PermissionsProvider apiClient={permissionsApiClient}>
      <SessionProvider>
        <TasksPermissionsProvider>
          <TaskList />
        </TasksPermissionsProvider>
      </SessionProvider>
    </PermissionsProvider>
  );
};
