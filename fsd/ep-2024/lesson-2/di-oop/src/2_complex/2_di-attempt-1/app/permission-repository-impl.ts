import { PermissionRepository } from '../permissions';

import { dbService } from './db-service-instance';

export class PermissionRepositoryImpl implements PermissionRepository {
  static allowedActions = ['read', 'write'] as const;

  async getPermissions() {
    const allPermissions = await dbService.getPermissions();

    return allPermissions.flatMap(({ userId, subject, actions }) => {
      type AllowedAction =
        (typeof PermissionRepositoryImpl.allowedActions)[number];

      const isAllowedAction = (action: string): action is AllowedAction =>
        PermissionRepositoryImpl.allowedActions.includes(
          action as AllowedAction,
        );

      return actions.filter(isAllowedAction).map((action) => ({
        userId,
        subject,
        action,
      }));
    });
  }
}
