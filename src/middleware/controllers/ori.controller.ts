import { BaseController } from './base.controller';
import { controlDataOri, OriHistoryData } from '@interfaces';

interface OriHistoryItem extends controlDataOri {
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
  async getData(): Promise<controlDataOri> {
    return this.get<controlDataOri>();
  }

  /**
   * Update ORI data
   */
  async update(data: controlDataOri): Promise<controlDataOri> {
    return this.put<controlDataOri, controlDataOri>('', data);
  }

  /**
   * Save ORI data to history
   */
  async save(data: controlDataOri): Promise<OriHistoryItem> {
    return this.post<OriHistoryItem, controlDataOri>('/save', data);
  }

  /**
   * Get last ORI history record
   */
  async getLast(): Promise<OriHistoryData> {
    return this.get<OriHistoryData>('/last');
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
  async reset(): Promise<controlDataOri> {
    return this.delete<controlDataOri>('/reset');
  }
}

export const oriController = new OriControllerClass();
