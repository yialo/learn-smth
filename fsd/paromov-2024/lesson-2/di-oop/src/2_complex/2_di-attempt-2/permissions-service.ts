// Intermediate module

import { PermissionRepository, PermissionAction } from './permissions-contract';
import { TaskGuard, TaskAction } from './task-contract';

// Relatively independent module
export class PermissionService {
  #permissionRepository: PermissionRepository;

  constructor(permissionRepository: PermissionRepository) {
    this.#permissionRepository = permissionRepository;
  }

  async can({
    userId,
    subject,
    action,
  }: {
    userId: string;
    subject: string;
    action: string;
  }) {
    const permissions = await this.#permissionRepository.getPermissions();

    return !!permissions.find((p) => {
      return (
        p.userId === userId && p.subject === subject && p.action === action
      );
    });
  }
}

// Adapter
export class TaskGuardImpl implements TaskGuard {
  #permissionService: PermissionService;

  constructor(permissionService: PermissionService) {
    this.#permissionService = permissionService;
  }

  async canOrThrow(userId: string, taskAction: TaskAction) {
    const action = ((): PermissionAction => {
      if (taskAction === 'add' || taskAction === 'remove') return 'write';
      return 'read';
    })();

    const isAllowed = await this.#permissionService.can({
      userId,
      subject: 'task',
      action,
    });

    if (!isAllowed) {
      throw new UnauthorizedError();
    }
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('UnauthorizedError');
  }
}
