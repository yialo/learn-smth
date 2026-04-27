export type User = {
  id: string;
  name: string;
};

export interface UserRepository {
  getUser(userId: string): Promise<User | null>;
}
