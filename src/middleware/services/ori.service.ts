import { oriController } from '@middleware/controllers';

interface OriData {
  indice: number;
  segundos: number;
  minutos: number;
}

interface OriHistoryData {
  id: string;
  indice: number;
  segundos: number;
  minutos: number;
  timestamp: string;
}

interface OriUpdateInput {
  indice: number;
  segundos: number;
  minutos: number;
}

export const oriService = {
  async getData(): Promise<OriData> {
    return await oriController.getData();
  },

  async update(input: OriUpdateInput): Promise<OriData> {
    return await oriController.update(input);
  },

  async save(input: OriUpdateInput): Promise<OriHistoryData> {
    return await oriController.save(input);
  },

  async getLast(): Promise<OriHistoryData[]> {
    return await oriController.getLast();
  },

  async deleteHistory(id: string): Promise<{ message: string }> {
    return await oriController.deleteHistory(id);
  },

  async reset(): Promise<OriData> {
    return await oriController.reset();
  },
};

export default oriService;
