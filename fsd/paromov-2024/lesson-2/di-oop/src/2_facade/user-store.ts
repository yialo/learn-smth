// Stable module

import { User, UserApi } from './user-api';

export class UserStore {
  #api = new UserApi();

  isLoading = false;
  user: User | null = null;

  async fetchUser(userId: string) {
    this.isLoading = true;
    const user = await this.#api.getUser(userId);
    this.isLoading = false;
    this.user = user;
  }
}
