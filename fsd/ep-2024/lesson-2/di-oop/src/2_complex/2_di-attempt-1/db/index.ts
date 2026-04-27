// Infrastructure module

import { nanoid } from 'nanoid';

type TaskEntity = { id: string; title: string };
type UserEntity = { id: string; name: string };
type PermissionEntity = { userId: string; subject: string; actions: string[] };

export class DbService {
  #tasks: TaskEntity[] = [];
  #users: UserEntity[] = [];
  #permissions: PermissionEntity[] = [];

  constructor({
    users,
    tasks,
    permissions,
  }: {
    users: UserEntity[];
    tasks: TaskEntity[];
    permissions: PermissionEntity[];
  }) {
    this.#tasks = tasks;
    this.#users = users;
    this.#permissions = permissions;
  }

  async getUser(userId: string) {
    return this.#users.find((user) => user.id === userId) ?? null;
  }

  async getTask(taskId: string) {
    return this.#tasks.find((task) => task.id === taskId) ?? null;
  }

  async createTask(title: string) {
    const newTask = {
      id: nanoid(),
      title,
    };
    this.#tasks = [...this.#tasks, newTask];
    return newTask;
  }

  async updateTask(taskId: string, title: string) {
    const taskIndexToUpdate = this.#tasks.findIndex(
      (task) => task.id === taskId,
    );
    if (taskIndexToUpdate === -1) return null;

    this.#tasks = this.#tasks.map((task, taskIndex) =>
      taskIndex === taskIndexToUpdate
        ? {
            ...task,
            title,
          }
        : task,
    );

    return this.#tasks[taskIndexToUpdate];
  }

  async deleteTask(taskId: string) {
    const taskToDelete = this.#tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return undefined;

    this.#tasks = this.#tasks.filter((task) => task !== taskToDelete);
    return taskToDelete.id;
  }

  async getPermissions() {
    return this.#permissions;
  }
}
