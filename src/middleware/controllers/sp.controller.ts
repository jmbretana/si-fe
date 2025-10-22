import { BaseController } from './base.controller';

interface SpData {
  saturacion: number;
  segundos: number;
  minutos: number;
}

interface SpHistoryItem extends SpData {
  id: string;
  timestamp: string;
}

interface SpUpdateRequest {
  saturacion: number;
  segundos: number;
  minutos: number;
}

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
  async getData(): Promise<SpData> {
    return this.get<SpData>();
  }

  /**
   * Update SP data
   */
  async update(data: SpUpdateRequest): Promise<SpData> {
    return this.put<SpData, SpUpdateRequest>('', data);
  }

  /**
   * Save SP data to history
   */
  async save(data: SpUpdateRequest): Promise<SpHistoryItem> {
    return this.post<SpHistoryItem, SpUpdateRequest>('/save', data);
  }

  /**
   * Get last SP history record
   */
  async getLast(): Promise<SpHistoryItem[]> {
    return this.get<SpHistoryItem[]>('/last');
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
  async reset(): Promise<SpData> {
    return this.delete<SpData>('/reset');
  }
}

export const spController = new SpControllerClass();
