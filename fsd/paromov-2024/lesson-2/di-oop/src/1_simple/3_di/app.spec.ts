// Composite module

import { it, test, vi, expect } from 'vitest';

import { UserApiImpl } from './user-http-service';
import { UserApi, UserEntity, UserStore } from './user-store';

it('should work with mock adapter', async () => {
  const userApiMock = { getUser: vi.fn() } satisfies UserApi;
  userApiMock.getUser.mockResolvedValue({
    id: '123',
    name: 'Bob',
  } satisfies UserEntity);

  const store = new UserStore(userApiMock);

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

test('integration', async () => {
  const store = new UserStore(new UserApiImpl());

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
