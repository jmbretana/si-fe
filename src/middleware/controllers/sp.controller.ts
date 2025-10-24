import { BaseController } from './base.controller';
import { controlDataSp, SpHistoryData, SpUpdateInput } from '@interfaces';

/**
 * SP (Saturación de Oxígeno) Controller
 * Handles oxygen saturation operations
 */
class SpControllerClass extends BaseController {
  constructor() {
    super('/sp');
  }

  /**
   * Get current SP data
   */
  async getData(): Promise<controlDataSp> {
    return this.get<controlDataSp>();
  }

  /**
   * Update SP data
   */
  async update(data: SpUpdateInput): Promise<controlDataSp> {
    return this.put<controlDataSp, SpUpdateInput>('', data);
  }

  /**
   * Save SP data to history
   */
  async save(data: SpUpdateInput): Promise<SpHistoryData> {
    return this.post<SpHistoryData, SpUpdateInput>('/saveSP', data);
  }

  /**
   * Get last SP history record
   */
  async getLast(): Promise<controlDataSp> {
    return this.get<controlDataSp>('/last');
  }

  /**
   * Delete history item by ID
   */
  async deleteHistory(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/history/${id}`);
  }

  /**
   * Reset SP data
   */
  async reset(): Promise<controlDataSp> {
    return this.delete<controlDataSp>('/reset');
  }
}

export const spController = new SpControllerClass();
