import { spController } from '@middleware/controllers';
import { controlDataSp, SpHistoryData, SpUpdateInput } from '@interfaces';

export const spService = {
  async getData(): Promise<controlDataSp> {
    return await spController.getData();
  },

  async update(input: SpUpdateInput): Promise<controlDataSp> {
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

  async reset(): Promise<controlDataSp> {
    return await spController.reset();
  },
};

export default spService;
