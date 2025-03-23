// Facade module: adapts UserHttpService to UserStore

import { UserHttpService } from './user-http-service';

export type User = {
  id: string;
  name: string;
};

export class UserApi {
  #http = new UserHttpService();

  async getUser(userId: string): Promise<User> {
    const userDto = await this.#http.get(`/user/${userId}`);
    return {
      id: userDto.id,
      name: userDto.title,
    };
  }
}
