import { BaseController } from './base.controller';
import { controlDataFc, FCHistoryData } from '@interfaces';

/**
 * FC (Frecuencia Cardíaca) Controller
 * Handles heart rate operations
 */
class FcControllerClass extends BaseController {
  constructor() {
    super('/fc');
  }

  /**
   * Get current FC data
   */
  async getData(): Promise<controlDataFc> {
    return this.get<controlDataFc>();
  }

  /**
   * Update FC data
   */
  async update(data: controlDataFc): Promise<controlDataFc> {
    return this.put<controlDataFc, controlDataFc>('', data);
  }

  /**
   * Save FC data to history
   */
  async save(data: controlDataFc): Promise<FCHistoryData> {
    return this.post<FCHistoryData, controlDataFc>('/saveFP', data);
  }

  /**
   * Get last FC history record
   */
  async getLast(): Promise<FCHistoryData> {
    return this.get<FCHistoryData>('/last');
  }

  /**
   * Delete history item by ID
   */
  async deleteHistory(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/history/${id}`);
  }

  /**
   * Reset FC data
   */
  async reset(): Promise<controlDataFc> {
    return this.delete<controlDataFc>('/reset');
  }
}

export const fcController = new FcControllerClass();
