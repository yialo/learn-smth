// Stable module

import { UserDto, UserHttpService } from './user-http-service';

export class UserStore {
  #http = new UserHttpService();

  isLoading = false;
  user: UserDto | null = null;

  async fetchUser(id: string) {
    this.isLoading = true;
    const user = await this.#http.get(`/user/${id}`);
    this.isLoading = false;
    this.user = user;
  }
}
