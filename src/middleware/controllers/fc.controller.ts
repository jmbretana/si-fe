import { BaseController } from './base.controller';

interface FcData {
  frecuencia: number;
  segundos: number;
  minutos: number;
}

interface FcHistoryItem extends FcData {
  id: string;
  timestamp: string;
}

interface FcUpdateRequest {
  frecuencia: number;
  segundos: number;
  minutos: number;
}

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
  async getData(): Promise<FcData> {
    return this.get<FcData>();
  }

  /**
   * Update FC data
   */
  async update(data: FcUpdateRequest): Promise<FcData> {
    return this.put<FcData, FcUpdateRequest>('', data);
  }

  /**
   * Save FC data to history
   */
  async save(data: FcUpdateRequest): Promise<FcHistoryItem> {
    return this.post<FcHistoryItem, FcUpdateRequest>('/save', data);
  }

  /**
   * Get last FC history record
   */
  async getLast(): Promise<FcHistoryItem[]> {
    return this.get<FcHistoryItem[]>('/last');
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
  async reset(): Promise<FcData> {
    return this.delete<FcData>('/reset');
  }
}

export const fcController = new FcControllerClass();
