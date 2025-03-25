// Not user anywhere, just for example

import { UserRepository } from './user-contract';

export class UserService {
  #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  getUserById(userId: string) {
    return this.#userRepository.getUser(userId);
  }
}
