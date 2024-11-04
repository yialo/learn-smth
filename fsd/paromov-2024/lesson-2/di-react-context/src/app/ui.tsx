import * as React from 'react';
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

export const App: React.FC = () => {
  const [permissionsApiClient] = React.useState(() =>
    createPermissionsApiClient(),
  );

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
