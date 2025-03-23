// Unstable module

import { nanoid } from 'nanoid';

export type UserDto = {
  id: string;
  title: string;
};

export class UserHttpService {
  async get(url: `/user/${string}`): Promise<UserDto>;
  async get(): Promise<UserDto> {
    return {
      id: nanoid(),
      title: 'Bob',
    };
  }
}
