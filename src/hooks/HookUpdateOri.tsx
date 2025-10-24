/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { oriService } from '@services/ori.service';
import { controlDataOri, OriHistoryData, errorData } from '@interfaces';

export const updateOri = () => {
  const [dataOri, setDataOri] = useState<controlDataOri>();
  const [dataLastOri, setDataLastOri] = useState<controlDataOri>();

  const [savingOri, setSavingOri] = useState<boolean>(false);
  const [savingAddOri, setSavingAddOri] = useState<boolean>(false);

  const [loadingDataOri, setLoadingDataOri] = useState<boolean>(false);
  const [loadingResetOri, setLoadingResetOri] = useState<boolean>(false);

  const [errorOri, setErrorOri] = useState<errorData>();

  const getDataOri = async () => {
    try {
      setLoadingDataOri(true);
      const data: any = await oriService.getData();
      setDataOri(data);
    } catch (error: any) {
      console.log(error);
      setErrorOri(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingDataOri(false);
    }
  };

  const getLastOri = async () => {
    try {
      setLoadingDataOri(true);
      const data: any = await oriService.getLast();
      setDataLastOri(data.data);
    } catch (error: any) {
      setErrorOri(error.response?.data?.error?.message || error.message);
    } finally {
      setLoadingDataOri(false);
    }
  };

  const deleteDataOri = async (id: string) => {
    try {
      setLoadingDataOri(true);
      await oriService.deleteHistory(id);
    } catch (error: any) {
      console.log(error);
      setErrorOri(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingDataOri(false);
    }
  };

  const resetDataOri = async () => {
    try {
      setLoadingResetOri(true);
      await oriService.reset();

      const control: controlDataOri = {
        id: 'ori',
        ori: 0,
        oriSeconds: 1,
      };

      await updateDataOri(control);
      await getDataOri();
      await getLastOri();
    } catch (error: any) {
      console.log(error);
      setErrorOri(error.response?.data?.error?.code || error.message);
    } finally {
      setLoadingResetOri(false);
    }
  };

  const updateDataOri = async (control: controlDataOri) => {
    try {
      setSavingOri(true);
      await oriService.update({
        id: control.id,
        ori: control.ori,
        oriSeconds: control.oriSeconds,
      });
    } catch (error: any) {
      console.log(error);
      setErrorOri(error.response?.data?.error?.message || error.message);
    } finally {
      setSavingOri(false);
    }
  };

  const addDataOri = async (control: controlDataOri) => {
    setSavingAddOri(true);

    try {
      await oriService.save({
        id: control.id,
        ori: control.ori,
        oriSeconds: control.oriSeconds,
      });
      setSavingAddOri(false);
    } catch (error: any) {
      console.log(error);
      setErrorOri(error.response?.data?.error?.message || error.message);
    }
  };

  return {
    dataOri,
    dataLastOri,

    loadingDataOri,
    loadingResetOri,
    savingOri,

    getDataOri,
    getLastOri,

    addDataOri,
    savingAddOri,

    resetDataOri,

    errorOri,
    updateDataOri,
  };
};
