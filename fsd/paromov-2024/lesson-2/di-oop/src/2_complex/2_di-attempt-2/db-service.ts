// Tool module

import { nanoid } from 'nanoid';

import { PermissionRepository, Permission } from './permissions-contract';
import { TaskRepository, Task } from './task-contract';
import { UserRepository, User } from './user-contract';

// Direct implementation without adapters
export class DbService
  implements PermissionRepository, TaskRepository, UserRepository
{
  #users: User[] = [];
  #permissions: Permission[] = [];
  #tasks: Task[] = [];

  constructor({
    users,
    permissions,
  }: {
    users: User[];
    permissions: Permission[];
  }) {
    this.#users = users;
    this.#permissions = permissions.filter(
      (p) => !!users.find((u) => u.id === p.userId),
    );
  }

  async getUser(userId: string) {
    return this.#users.find((user) => user.id === userId) ?? null;
  }

  async getPermissions(): Promise<Permission[]> {
    return this.#permissions;
  }

  async getTask(taskId: string): Promise<Task | null> {
    return this.#tasks.find((task) => task.id === taskId) ?? null;
  }
  async createTask({ title }: { title: string }): Promise<Task> {
    const newTask = {
      id: nanoid(),
      title,
    };
    this.#tasks = [...this.#tasks, newTask];
    return newTask;
  }
  async deleteTask(taskId: string): Promise<string | undefined> {
    const taskToDelete = this.#tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return undefined;

    this.#tasks = this.#tasks.filter((task) => task !== taskToDelete);
    return taskToDelete.id;
  }
}
