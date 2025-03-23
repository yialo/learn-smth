import { it } from 'vitest';

import { TaskService } from './task';

it('should work for present user', async ({ expect }) => {
  const taskService = new TaskService('1');

  const newTask = await taskService.create('Task');
  expect(newTask).toEqual({
    id: expect.any(String),
    title: 'Task',
  });

  const receivedTask = await taskService.get(newTask.id);
  expect(receivedTask).toEqual(newTask);

  const taskDeletionResult = await taskService.delete(newTask.id);
  expect(taskDeletionResult).toBe(newTask.id);

  const deletedTaskRequestResult = await taskService.get(newTask.id);
  expect(deletedTaskRequestResult).toBeNull();
});

it('should throw for absent user', async ({ expect }) => {
  const taskService = new TaskService('2');
  await expect(taskService.create('Task')).rejects.toThrowError(
    'UnauthorizedError',
  );
});
