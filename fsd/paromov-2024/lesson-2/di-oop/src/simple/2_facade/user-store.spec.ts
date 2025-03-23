import { it, expect } from 'vitest';

import { UserStore } from './user-store';

it('should work', async () => {
  const store = new UserStore();

  expect(store.isLoading).toBe(false);

  const respose = store.fetchUser('123');
  expect(store.isLoading).toBe(true);
  expect(store.user).toBeNull();

  await respose;
  expect(store.isLoading).toBe(false);
  expect(store.user).toEqual({
    id: expect.any(String),
    name: expect.any(String),
  });
});
