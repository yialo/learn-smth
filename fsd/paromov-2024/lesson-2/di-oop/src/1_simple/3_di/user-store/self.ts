// Stable module

import { UserEntity, UserApi } from './contract';

export class UserStore {
  constructor(private userApi: UserApi) {}

  isLoading = false;
  user: UserEntity | null = null;

  async fetchUser(userId: string) {
    this.isLoading = true;
    const user = await this.userApi.getUser(userId);
    this.isLoading = false;
    this.user = user;
  }
}
