import { apiClient } from './apiClient';
import { AuthUser } from '../models/AuthUser';

class AuthService {
  login(username: string, password: string): Promise<AuthUser> {
    return apiClient.post<AuthUser>('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
  }

  logout(): Promise<void> {
    // future: clear tokens, server logout
    return Promise.resolve();
  }
}

export const authService = new AuthService();
