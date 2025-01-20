import { SessionContext } from './api';
import { CURRENT_USER_ID, Session } from './config';

const session: Session = { userId: CURRENT_USER_ID };

export const SessionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <SessionContext value={session}>{children}</SessionContext>;
};
