// Unstable module

import { nanoid } from 'nanoid';
import { UserApi } from '../user-store';

type UserDto = {
  id: string;
  title: string;
};

class UserHttpService {
  async get(url: `/user/${string}`): Promise<UserDto>;
  async get(): Promise<UserDto> {
    return {
      id: nanoid(),
      title: 'Bob',
    };
  }
}

export class UserApiImpl implements UserApi {
  #http = new UserHttpService();

  async getUser(userId: string) {
    const userDto = await this.#http.get(`/user/${userId}`);
    return {
      id: userDto.id,
      name: userDto.title,
    };
  }
}
