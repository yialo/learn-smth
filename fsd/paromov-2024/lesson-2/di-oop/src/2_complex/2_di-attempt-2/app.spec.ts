import { it } from 'vitest';

import { DbService } from './db-service';
import {
  PermissionService,
  TaskGuardImpl,
  UnauthorizedError,
} from './permissions-service';
import { TaskService } from './task-service';

it('should work with real adapters', async ({ expect }) => {
  const dbService = new DbService({
    users: [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ],
    permissions: [
      {
        userId: '1',
        subject: 'task',
        action: 'read',
      },
      {
        userId: '1',
        subject: 'task',
        action: 'write',
      },
      {
        userId: '2',
        subject: 'task',
        action: 'read',
      },
    ],
  });

  const taskPermissionService = new PermissionService(dbService);
  const taskService = new TaskService({
    taskRepository: dbService,
    taskGuard: new TaskGuardImpl(taskPermissionService),
  });

  await expect(
    taskService.createTask('Task', { userId: '2' }),
  ).rejects.toThrowError(UnauthorizedError);

  const newTask = await taskService.createTask('Task', { userId: '1' });
  expect(newTask).toEqual({
    id: expect.any(String),
    title: 'Task',
  });

  const receivedTask = await taskService.getTaskById(newTask.id, {
    userId: '2',
  });
  expect(receivedTask).toEqual({
    id: expect.any(String),
    title: 'Task',
  });

  await expect(
    taskService.deleteTask(newTask.id, { userId: '2' }),
  ).rejects.toThrowError(UnauthorizedError);

  const deletedTaskId = await taskService.deleteTask(newTask.id, {
    userId: '1',
  });
  expect(deletedTaskId).toBe(newTask.id);

  const emptyTask = await taskService.getTaskById(newTask.id, {
    userId: '1',
  });
  expect(emptyTask).toBeNull();
});
