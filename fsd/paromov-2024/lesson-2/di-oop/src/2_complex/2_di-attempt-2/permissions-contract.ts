export type PermissionAction = 'read' | 'write';

export type Permission = {
  userId: string;
  subject: string;
  action: PermissionAction;
};

export interface PermissionRepository {
  getPermissions(): Promise<Permission[]>;
}
