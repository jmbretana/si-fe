/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { spService } from '@services/sp.service';
import { controlDataSp, SpHistoryData, errorData } from '@interfaces';

export const HookUpdateSp = () => {
  const [dataSp, setDataSp] = useState<controlDataSp | null>(null);
  const [dataLastSp, setDataLastSp] = useState<Array<controlDataSp>>([]);

  const [savingSp, setSavingSp] = useState<boolean>(false);
  const [loadingDataSp, setLoadingDataSp] = useState<boolean>(false);
  const [loadingResetSp, setLoadingResetSp] = useState<boolean>(false);

  const [errorSp, setErrorSp] = useState<errorData>();

  const getDataSp = async () => {
    try {
      setLoadingDataSp(true);
      const response: any = await spService.getData();
      setDataSp(response.data.data);
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingDataSp(false);
    }
  };

  const getLastSp = async () => {
    try {
      setLoadingDataSp(true);
      const data: SpHistoryData[] = await spService.getLast();
      const last = data && data.length > 0 ? data[0] : null;

      if (last) {
        setDataLastSp([
          {
            id: last.id,
            sp: last.sp,
            spSeconds: last.spSeconds,
            spMinutes: last.spMinutes,
            saturacion: last.saturacion,
          },
        ]);
      } else {
        setDataLastSp([]);
      }
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingDataSp(false);
    }
  };

  const deleteDataSp = async (id: string) => {
    try {
      setLoadingDataSp(true);
      await spService.deleteHistory(id);
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingDataSp(false);
    }
  };

  const resetDataSp = async () => {
    try {
      setLoadingResetSp(true);
      await spService.reset();

      const control: controlDataSp = {
        id: 'sp',
        sp: 100,
        spSeconds: 1,
      };

      await updateDataSp(control);
      await getDataSp();
      await getLastSp();
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingResetSp(false);
    }
  };

  const updateDataSp = async (control: controlDataSp) => {
    try {
      setSavingSp(true);
      await spService.update({
        sp: control.sp,
        spSeconds: control.spSeconds,
        spMinutes: control.spMinutes!,
        saturacion: control.saturacion!,
      });
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.message || error.message);
    } finally {
      setSavingSp(false);
    }
  };

  const addDataSp = async (control: controlDataSp) => {
    try {
      await spService.save({
        sp: control.sp,
        spSeconds: control.spSeconds,
        spMinutes: control.spMinutes!,
        saturacion: control.saturacion!,
      });
    } catch (error: any) {
      console.log(error);
      setErrorSp(error.response?.data?.error?.message || error.message);
    }
  };

  return {
    dataSp,
    dataLastSp,

    loadingDataSp,
    loadingResetSp,
    savingSp,

    getDataSp,
    getLastSp,

    addDataSp,
    resetDataSp,

    errorSp,
    updateDataSp,
  };
};

export default HookUpdateSp;
