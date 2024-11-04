import {
  createStrictContext,
  useStrictContext,
} from '../shared/strict-context';
import { Session } from './config';

export const SessionContext = createStrictContext<Session>();

export const useUserId = () => {
  return useStrictContext(SessionContext).userId;
};
