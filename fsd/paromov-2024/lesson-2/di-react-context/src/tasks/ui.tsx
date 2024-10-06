import * as React from 'react';
import { TasksContext, useTasks } from './api';
import { Task, TasksApiClient } from './config';

export const TasksProvider: React.FC<
  React.PropsWithChildren<{ apiClient: TasksApiClient }>
> = ({ children, apiClient }) => {
  return (
    <TasksContext.Provider value={apiClient}>{children}</TasksContext.Provider>
  );
};

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const { getMany } = useTasks();

  React.useEffect(() => {
    getMany().then(setTasks);
  }, [getMany]);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{`${task.title} ${task.completed ? '✅' : '❌'}`}</li>
      ))}
    </ul>
  );
};
