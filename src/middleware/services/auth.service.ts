import { authController } from '@middleware/controllers';
import {
  setToken,
  removeToken,
  getToken,
  isAuthenticated,
} from '@middleware/auth.middleware';

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface User {
  id: string;
  email: string;
}

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await authController.login(input);

    // Save token and user to localStorage
    setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await authController.register(input);

    // Save token and user to localStorage
    setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  },

  async getCurrentUser(): Promise<User> {
    return await authController.getCurrentUser();
  },

  logout(): void {
    removeToken();
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return getToken();
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return isAuthenticated();
  },
};

export default authService;
