import { it } from 'vitest';

import { UnauthorizedError } from '../permissions';
import { TaskService } from '../task';

import { TaskGuardImpl } from './task-guard-impl';
import { TaskRepositoryImpl } from './task-repository-impl';

it('should work with real adapters', async ({ expect }) => {
  const taskService = new TaskService({
    taskRepository: new TaskRepositoryImpl(),
    taskGuard: new TaskGuardImpl(),
  });

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
    taskService.updateTask(newTask.id, 'Updated', { userId: '2' }),
  ).rejects.toThrowError(UnauthorizedError);

  const updatedTask = await taskService.updateTask(newTask.id, 'Updated', {
    userId: '1',
  });
  expect(updatedTask).toEqual({
    id: expect.any(String),
    title: 'Updated',
  });

  await expect(
    taskService.deleteTask(newTask.id, { userId: '2' }),
  ).rejects.toThrowError(UnauthorizedError);

  const deletedTaskId = await taskService.deleteTask(newTask.id, {
    userId: '1',
  });
  expect(deletedTaskId).toBe(newTask.id);
});
