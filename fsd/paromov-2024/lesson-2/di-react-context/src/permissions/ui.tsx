import { PermissionsContext } from './api';
import { PermissionsApiClient } from './config';

export const PermissionsProvider: React.FC<
  React.PropsWithChildren<{ apiClient: PermissionsApiClient }>
> = ({ children, apiClient }) => {
  return <PermissionsContext value={apiClient}>{children}</PermissionsContext>;
};
