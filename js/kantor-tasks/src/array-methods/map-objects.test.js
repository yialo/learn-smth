import { test, expect } from 'vitest';

import { usersToUsersWithFullName } from './map-objects';

test('just works', () => {
  const input = [
    { name: 'Вася', surname: 'Пупкин', id: 1 },
    { name: 'Петя', surname: 'Иванов', id: 2 },
    { name: 'Маша', surname: 'Петрова', id: 3 },
  ];

  const result = usersToUsersWithFullName(input);
  const expected = [
    { fullName: 'Вася Пупкин', id: 1 },
    { fullName: 'Петя Иванов', id: 2 },
    { fullName: 'Маша Петрова', id: 3 },
  ];
  expect(result).toEqual(expected);
});
