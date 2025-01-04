import { createStorage } from './lib/storage';
import { Task, TaskList, TasksStorage, useTasksModel } from './tasks';
import { UserSelect } from './user';

const TASKS_STORAGE_KEY = 'tasks';

const tasksStorage = createStorage<Task[]>(TASKS_STORAGE_KEY);

const adaptedTasksStorage: TasksStorage = {
  getTasks: (defaultValue) => tasksStorage.get(defaultValue),
  saveTasks: (tasks) => tasksStorage.set(tasks),
};

export function App() {
  const tasksModel = useTasksModel({ storage: adaptedTasksStorage });

  return (
    <TaskList
      model={tasksModel}
      renderOwner={(ownerId, onChangeOwner) => (
        <UserSelect userId={ownerId} onChangeUserId={onChangeOwner} />
      )}
    />
  );
}
