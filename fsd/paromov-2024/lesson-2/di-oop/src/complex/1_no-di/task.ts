// The most important module

import { DbService } from './db';
import { PermissionsService, UnauthorizedError } from './permissions';

export class TaskService {
  #permissionsService: PermissionsService;
  #dbService = new DbService();

  constructor(userId: string) {
    this.#permissionsService = new PermissionsService(userId);
  }

  async get(taskId: string) {
    if (await this.#permissionsService.can('task', 'view')) {
      return this.#dbService.getTask(taskId);
    }
    throw new UnauthorizedError();
  }

  async create(title: string) {
    if (await this.#permissionsService.can('task', 'create')) {
      return this.#dbService.createTask(title);
    }
    throw new UnauthorizedError();
  }

  async delete(taskId: string) {
    if (await this.#permissionsService.can('task', 'delete')) {
      return this.#dbService.deleteTask(taskId);
    }
    throw new UnauthorizedError();
  }
}
