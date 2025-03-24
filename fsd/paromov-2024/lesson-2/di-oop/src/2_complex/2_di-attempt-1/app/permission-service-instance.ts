import { PermissionService } from '../permissions';

import { PermissionRepositoryImpl } from './permission-repository-impl';

export const permissionService = new PermissionService(
  new PermissionRepositoryImpl(),
);
