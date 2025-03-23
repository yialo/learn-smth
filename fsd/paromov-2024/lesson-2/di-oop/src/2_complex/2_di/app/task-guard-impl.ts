import { UnauthorizedError, PermissionAction } from '../permissions';
import { TaskAction, TaskGuard } from '../task';

import { permissionService } from './permission-service-instance';

export class TaskGuardImpl implements TaskGuard {
  async canOrThrow(userId: string, taskAction: TaskAction) {
    const action: PermissionAction = (() => {
      if (taskAction === 'view') return 'read';
      return 'write';
    })();

    const isAllowed = await permissionService.can({
      userId,
      subject: 'task',
      action,
    });
    if (!isAllowed) {
      throw new UnauthorizedError();
    }
  }
}
