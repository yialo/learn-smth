import { PermissionRepository } from './contract';

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
