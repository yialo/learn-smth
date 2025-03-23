export type PermissionAction = 'read' | 'write';

type Permission = {
  userId: string;
  subject: string;
  action: PermissionAction;
};

export interface PermissionRepository {
  getPermissions(): Promise<Permission[]>;
}
