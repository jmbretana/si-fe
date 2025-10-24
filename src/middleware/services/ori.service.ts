import { oriController } from '@middleware/controllers';
import { controlDataOri, OriHistoryData } from '@interfaces';

export const oriService = {
  async getData(): Promise<controlDataOri> {
    return await oriController.getData();
  },

  async update(input: controlDataOri): Promise<controlDataOri> {
    return await oriController.update(input);
  },

  async save(input: controlDataOri): Promise<OriHistoryData> {
    return await oriController.save(input);
  },

  async getLast(): Promise<controlDataOri> {
    return await oriController.getLast();
  },

  async deleteHistory(id: string): Promise<{ message: string }> {
    return await oriController.deleteHistory(id);
  },

  async reset(): Promise<controlDataOri> {
    return await oriController.reset();
  },
};

export default oriService;
