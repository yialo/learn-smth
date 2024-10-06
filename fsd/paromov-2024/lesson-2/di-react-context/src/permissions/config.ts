export type Permission = {
  id: string;
  subject: string;
  actions: string[];
};

export type PermissionsApiClient = {
  getPermissions(): Promise<Permission[]>;
};
