import { apiClient } from './apiClient';
import { User } from '../models/User';

class UserService {
  getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  }

  getUserById(id: number): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  }
}

export const userService = new UserService();
