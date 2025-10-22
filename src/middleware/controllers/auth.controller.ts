import { BaseController } from './base.controller';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
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

interface UserResponse {
  id: string;
  email: string;
}

/**
 * Auth Controller
 * Handles authentication operations
 */
class AuthControllerClass extends BaseController {
  constructor() {
    super('/auth');
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.post<AuthResponse, RegisterRequest>('/register', data);
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.post<AuthResponse, LoginRequest>('/login', data);
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<UserResponse> {
    return this.get<UserResponse>('/me');
  }
}

export const authController = new AuthControllerClass();
