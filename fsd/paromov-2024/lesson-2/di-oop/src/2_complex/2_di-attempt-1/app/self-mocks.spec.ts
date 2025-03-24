import { it, vi } from 'vitest';

import { UnauthorizedError } from '../permissions';
import { TaskAction, TaskService, TaskRepository, TaskGuard } from '../task';

it('should work with mock adapters', async ({ expect }) => {
  const taskRepository = {
    getOne: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } satisfies TaskRepository;

  let tasks: { id: string; title: string }[] = [];

  taskRepository.getOne.mockImplementation(async (taskId: string) => {
    return tasks.find((task) => task.id === taskId) || null;
  });
  taskRepository.insert.mockImplementation(
    async (payload: { title: string }) => {
      const newTask = {
        id: crypto.randomUUID(),
        title: payload.title,
      };
      tasks = [...tasks, newTask];
      return newTask;
    },
  );
  taskRepository.update.mockImplementation(
    async (taskId: string, payload: { title: string }) => {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return null;

      const updatedTask = {
        ...taskToUpdate,
        title: payload.title,
      };

      tasks = tasks.map((task) => (task === taskToUpdate ? updatedTask : task));
      return updatedTask;
    },
  );
  taskRepository.delete.mockImplementation(async (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return undefined;
    tasks = tasks.filter((task) => task !== taskToDelete);
    return taskId;
  });

  const taskGuard = {
    canOrThrow: vi.fn(),
  } satisfies TaskGuard;

  taskGuard.canOrThrow.mockImplementation(
    async (userId: string, taskAction: TaskAction) => {
      if (userId === '1') return;
      if (userId === '2' && taskAction === 'view') return;
      throw new UnauthorizedError();
    },
  );

  const taskService = new TaskService({
    taskRepository,
    taskGuard,
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
