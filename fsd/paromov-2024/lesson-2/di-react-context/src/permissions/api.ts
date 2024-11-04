import {
  createStrictContext,
  useStrictContext,
} from '../shared/strict-context';
import { PermissionsApiClient } from './config';

export const PermissionsContext = createStrictContext<PermissionsApiClient>();

export const usePermissions = () => {
  const { getPermissions } = useStrictContext(PermissionsContext);

  return {
    async can(userId: string, action: string) {
      const permissions = await getPermissions();

      const isAllowed = !!permissions.find(
        (permission) =>
          permission.subject === userId && permission.actions.includes(action),
      );

      return Promise.resolve(isAllowed);
    },
  };
};
