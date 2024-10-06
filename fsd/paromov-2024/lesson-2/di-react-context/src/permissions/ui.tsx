import { PermissionsContext } from './api';
import { PermissionsApiClient } from './config';

export const PermissionsProvider: React.FC<
  React.PropsWithChildren<{ apiClient: PermissionsApiClient }>
> = ({ children, apiClient }) => {
  return (
    <PermissionsContext.Provider value={apiClient}>
      {children}
    </PermissionsContext.Provider>
  );
};
