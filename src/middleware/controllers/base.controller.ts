import api from '@services/api';
import { AxiosResponse } from 'axios';

/**
 * Base Controller
 * Provides common HTTP methods for all controllers
 */
export class BaseController {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * GET request
   */
  protected async get<T>(endpoint = ''): Promise<T> {
    const response: AxiosResponse<T> = await api.get(
      `${this.basePath}${endpoint}`,
    );
    return response.data;
  }

  /**
   * POST request
   */
  protected async post<T, D = unknown>(endpoint = '', data?: D): Promise<T> {
    const response: AxiosResponse<T> = await api.post(
      `${this.basePath}${endpoint}`,
      data,
    );
    return response.data;
  }

  /**
   * PUT request
   */
  protected async put<T, D = unknown>(endpoint = '', data?: D): Promise<T> {
    const response: AxiosResponse<T> = await api.put(
      `${this.basePath}${endpoint}`,
      data,
    );
    return response.data;
  }

  /**
   * DELETE request
   */
  protected async delete<T>(endpoint = ''): Promise<T> {
    const response: AxiosResponse<T> = await api.delete(
      `${this.basePath}${endpoint}`,
    );
    return response.data;
  }
}
