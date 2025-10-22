import { fcController } from '@middleware/controllers';

interface FcData {
  frecuencia: number;
  segundos: number;
  minutos: number;
}

interface FcHistoryData {
  id: string;
  frecuencia: number;
  segundos: number;
  minutos: number;
  timestamp: string;
}

interface FcUpdateInput {
  frecuencia: number;
  segundos: number;
  minutos: number;
}

export const fcService = {
  async getData(): Promise<FcData> {
    return await fcController.getData();
  },

  async update(input: FcUpdateInput): Promise<FcData> {
    return await fcController.update(input);
  },

  async save(input: FcUpdateInput): Promise<FcHistoryData> {
    return await fcController.save(input);
  },

  async getLast(): Promise<FcHistoryData[]> {
    return await fcController.getLast();
  },

  async deleteHistory(id: string): Promise<{ message: string }> {
    return await fcController.deleteHistory(id);
  },

  async reset(): Promise<FcData> {
    return await fcController.reset();
  },
};

export default fcService;
