import { BaseController } from './base.controller';

interface OriData {
  indice: number;
  segundos: number;
  minutos: number;
}

interface OriHistoryItem extends OriData {
  id: string;
  timestamp: string;
}

interface OriUpdateRequest {
  indice: number;
  segundos: number;
  minutos: number;
}

/**
 * ORI (Índice de Reserva de Oxígeno) Controller
 * Handles oxygen reserve index operations
 */
class OriControllerClass extends BaseController {
  constructor() {
    super('/ori');
  }

  /**
   * Get current ORI data
   */
  async getData(): Promise<OriData> {
    return this.get<OriData>();
  }

  /**
   * Update ORI data
   */
  async update(data: OriUpdateRequest): Promise<OriData> {
    return this.put<OriData, OriUpdateRequest>('', data);
  }

  /**
   * Save ORI data to history
   */
  async save(data: OriUpdateRequest): Promise<OriHistoryItem> {
    return this.post<OriHistoryItem, OriUpdateRequest>('/save', data);
  }

  /**
   * Get last ORI history record
   */
  async getLast(): Promise<OriHistoryItem[]> {
    return this.get<OriHistoryItem[]>('/last');
  }

  /**
   * Delete history item by ID
   */
  async deleteHistory(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/history/${id}`);
  }

  /**
   * Reset ORI data
   */
  async reset(): Promise<OriData> {
    return this.delete<OriData>('/reset');
  }
}

export const oriController = new OriControllerClass();
