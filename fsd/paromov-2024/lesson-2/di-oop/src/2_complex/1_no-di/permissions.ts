// Infrastructure module

import { DbService } from './db';

export class PermissionsService {
  #dbService: DbService;

  constructor(private userId: string) {
    this.#dbService = new DbService();
  }

  async can(subject: string, action: string) {
    const permissions = await this.#dbService.getPermissions(this.userId);
    return !!permissions.find((permission) => {
      return permission.subject === subject && permission.action === action;
    });
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('UnauthorizedError');
  }
}
