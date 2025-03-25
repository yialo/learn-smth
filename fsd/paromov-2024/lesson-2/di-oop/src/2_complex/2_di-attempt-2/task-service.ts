// The most important module

import { TaskRepository, TaskGuard } from './task-contract';

type Auth = { userId: string };

export class TaskService {
  #taskRepository: TaskRepository;
  #taskGuard: TaskGuard;

  constructor({
    taskRepository,
    taskGuard,
  }: {
    taskRepository: TaskRepository;
    taskGuard: TaskGuard;
  }) {
    this.#taskRepository = taskRepository;
    this.#taskGuard = taskGuard;
  }

  async getTaskById(taskId: string, { userId }: Auth) {
    await this.#taskGuard.canOrThrow(userId, 'view');
    return this.#taskRepository.getTask(taskId);
  }

  async createTask(title: string, { userId }: Auth) {
    await this.#taskGuard.canOrThrow(userId, 'add');
    return this.#taskRepository.createTask({ title });
  }

  async deleteTask(taskId: string, { userId }: Auth) {
    await this.#taskGuard.canOrThrow(userId, 'remove');
    return this.#taskRepository.deleteTask(taskId);
  }
}
