import * as React from 'react';

export type User = {
  id: string;
  name: string;
};

export function useUsers(): User[] {
  return React.useState(() => [
    { id: 'user-1', name: 'me' },
    { id: 'user-2', name: 'evgeny' },
  ])[0];
}
