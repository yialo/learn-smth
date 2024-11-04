import { DbRepository } from '../db';
import {
  Permission,
  PermissionsApiClient,
  usePermissions,
} from '../permissions';
import { Task, TaskAction, TasksApiClient } from '../tasks';

const permissionsRepository = new DbRepository<Permission>([
  { id: '1', subject: 'user-1', actions: ['add', 'view', 'delete'] },
  { id: '2', subject: 'user-2', actions: ['view'] },
  { id: '3', subject: 'user-3', actions: [] },
]);

export const createPermissionsApiClient = (): PermissionsApiClient => {
  return {
    getPermissions() {
      return permissionsRepository.getEntities();
    },
  };
};

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const useAuthorizeTaskAction = () => {
  const { can } = usePermissions();

  return async ({ action, userId }: { action: string; userId: string }) => {
    const isAllowed = await can(userId, action);

    if (!isAllowed) {
      throw new UnauthorizedError(
        `Action "${action}" is not allowed for user with ID "${userId}"`,
      );
    }
  };
};

const tasksRepository = new DbRepository<Task>([
  {
    id: '1',
    title: 'Use DI in React with Context and Hooks',
    completed: false,
  },
  {
    id: '2',
    title: 'Learn TypeScript',
    completed: true,
  },
  {
    id: '3',
    title: 'Write tests for React components',
    completed: false,
  },
]);

export const useTasksApiClient = (userId: string): TasksApiClient => {
  const authorizeTaskAction = useAuthorizeTaskAction();

  return {
    getTasks() {
      return tasksRepository.getEntities();
    },

    async getTaskById(id) {
      const tasks = await tasksRepository.getEntities();
      return tasks.find((task) => task.id === id) || null;
    },

    addTask(title) {
      return tasksRepository.insertEntity({
        title,
        completed: false,
      });
    },

    async deleteTask(id) {
      await tasksRepository.deleteEntity(id);
    },

    async authorizeActionOrThrow(action: TaskAction) {
      await authorizeTaskAction({ action, userId });
    },
  };
};
