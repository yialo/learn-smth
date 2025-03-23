// Infrastructure module

import { nanoid } from 'nanoid';

export class DbService {
  #tasks: { id: string; title: string }[] = [];
  #users: { id: string; name: string }[] = [{ id: '1', name: 'Bob' }];

  async getTask(taskId: string) {
    return this.#tasks.find((task) => task.id === taskId) ?? null;
  }

  async createTask(title: string) {
    const newTask = {
      id: nanoid(),
      title,
    };
    this.#tasks.push(newTask);
    return newTask;
  }

  async deleteTask(taskId: string) {
    const taskToDelete = this.#tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return undefined;

    this.#tasks = this.#tasks.filter((task) => task !== taskToDelete);
    return taskToDelete.id;
  }

  async getPermissions(userId: string) {
    const actor = this.#users.find((user) => user.id === userId);
    if (!actor) return [];

    return [
      { subject: 'task', action: 'view' },
      { subject: 'task', action: 'create' },
      { subject: 'task', action: 'delete' },
    ] satisfies { subject: string; action: string }[];
  }
}
