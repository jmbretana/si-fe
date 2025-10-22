import { spController } from '@middleware/controllers';

interface SpData {
  saturacion: number;
  segundos: number;
  minutos: number;
}

interface SpHistoryData {
  id: string;
  saturacion: number;
  segundos: number;
  minutos: number;
  timestamp: string;
}

interface SpUpdateInput {
  saturacion: number;
  segundos: number;
  minutos: number;
}

export const spService = {
  async getData(): Promise<SpData> {
    return await spController.getData();
  },

  async update(input: SpUpdateInput): Promise<SpData> {
    return await spController.update(input);
  },

  async save(input: SpUpdateInput): Promise<SpHistoryData> {
    return await spController.save(input);
  },

  async getLast(): Promise<SpHistoryData[]> {
    return await spController.getLast();
  },

  async deleteHistory(id: string): Promise<{ message: string }> {
    return await spController.deleteHistory(id);
  },

  async reset(): Promise<SpData> {
    return await spController.reset();
  },
};

export default spService;
