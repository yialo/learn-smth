export type UserEntity = {
  id: string;
  name: string;
};

export interface UserApi {
  getUser(userId: string): Promise<UserEntity>;
}
