import { api } from '../api';

export interface User {
  email: string;
  name: string;
  id: number;
  phone: string;
  username: string;
}

class UsersService {
  async listUsers() {
    return api.get<User[]>('/users');
  }
}

const usersService = new UsersService();

export { usersService };
