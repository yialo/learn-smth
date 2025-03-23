import { DbService } from '../db';

export const dbService = new DbService({
  users: [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ],
  tasks: [],
  permissions: [
    {
      userId: '1',
      subject: 'task',
      actions: ['read', 'write'],
    },
    {
      userId: '2',
      subject: 'task',
      actions: ['read'],
    },
  ],
});
