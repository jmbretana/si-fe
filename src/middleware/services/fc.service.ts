import { fcController } from '@middleware/controllers';
import { controlDataFc, FCHistoryData, FCUpdateInput } from '@interfaces';

export const fcService = {
  async getData(): Promise<controlDataFc> {
    return await fcController.getData();
  },

  async update(input: controlDataFc): Promise<controlDataFc> {
    return await fcController.update(input);
  },

  async save(input: controlDataFc): Promise<FCHistoryData> {
    return await fcController.save(input);
  },

  async getLast(): Promise<FCHistoryData[]> {
    return await fcController.getLast();
  },

  async deleteHistory(id: string): Promise<{ message: string }> {
    return await fcController.deleteHistory(id);
  },

  async reset(): Promise<controlDataFc> {
    return await fcController.reset();
  },
};

export default fcService;
