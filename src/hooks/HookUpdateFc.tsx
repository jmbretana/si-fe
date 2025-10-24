/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { fcService } from '@services/fc.service';
import { controlDataFc, FCHistoryData, errorData } from '@interfaces';

export const HookUpdateFc = () => {
  const [dataFc, setDataFc] = useState<controlDataFc>();
  const [dataLastFc, setDataLastFc] = useState<controlDataFc>();

  const [savingFc, setSavingFc] = useState<boolean>(false);

  const [loadingDataFc, setLoadingDataFc] = useState<boolean>(false);
  const [loadingLastFc, setLoadingLastFc] = useState<boolean>(false);
  const [loadingResetFc, setLoadingResetFc] = useState<boolean>(false);

  const [errorFc, setErrorFc] = useState<errorData>();

  const getDataFc = async () => {
    try {
      setLoadingDataFc(true);
      const response: any = await fcService.getData();
      setDataFc(response.data.data);
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingDataFc(false);
    }
  };

  const getLastFc = async () => {
    try {
      setLoadingLastFc(true);
      const data: any = await fcService.getLast();
      setDataLastFc(data.data);
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingLastFc(false);
    }
  };

  const deleteDataFc = async (id: string) => {
    try {
      setLoadingDataFc(true);
      await fcService.deleteHistory(id);
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingDataFc(false);
    }
  };

  const resetDataFc = async () => {
    try {
      setLoadingResetFc(true);
      await fcService.reset();

      const control: controlDataFc = {
        id: 'fc',
        fc: 100,
        fcSeconds: 1,
      };
      await updateDataFc(control);
      await getDataFc();
      await getLastFc();
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingResetFc(false);
    }
  };

  const updateDataFc = async (control: controlDataFc) => {
    try {
      setSavingFc(true);
      await fcService.update({
        id: control.id,
        fc: control.fc,
        fcSeconds: control.fcSeconds,
      });
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.message || error.message);
    } finally {
      setSavingFc(false);
    }
  };

  const addDataFc = async (control: controlDataFc) => {
    try {
      await fcService.save({
        id: control.id,
        fc: control.fc,
        fcSeconds: control.fcSeconds,
      });
    } catch (error: any) {
      console.log(error);
      setErrorFc(error.response?.data?.error?.message || error.message);
    }
  };

  return {
    dataFc,
    getDataFc,
    loadingDataFc,

    loadingResetFc,
    savingFc,

    dataLastFc,
    getLastFc,
    loadingLastFc,

    addDataFc,
    resetDataFc,

    errorFc,
    updateDataFc,
  };
};

export default HookUpdateFc;
