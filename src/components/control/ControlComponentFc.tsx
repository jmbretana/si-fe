import { useEffect, useState } from 'react';
import React from 'react';
import { controlDataFc } from '../../interfaces';
import { HookUpdateFc } from '../../hooks/HookUpdateFc';
import ControlComponent from './ControlComponent';

const ControlComponentFc: React.FunctionComponent = () => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [newControl, setNewControl] = useState<controlDataFc>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [oldValue, setOldValue] = useState<number>(0);
  const [newValue, setNewValue] = useState<number>(0);
  const [newCounter, setNewCounter] = useState<number>();

  const {
    dataFc,
    getDataFc,

    dataLastFc,
    getLastFc,

    addDataFc,
    loadingResetFc,
    savingFc,
    updateDataFc,
  } = HookUpdateFc();

  useEffect(() => {
    if (!dataFc) getDataFc();
    if (!dataLastFc) getLastFc();
  }, []);

  useEffect(() => {
    if (loadingResetFc) {
      getDataFc();
      getLastFc();
    }
  }, [loadingResetFc]);

  useEffect(() => {
    if (dataFc) {
      setOldValue(dataFc.fc);
      setNewValue(dataFc.fc);
      changeSecondsHandler(dataFc.fcSeconds);
    }
  }, [dataFc]);

  useEffect(() => {
    if (dataLastFc) {
      setNewControl(dataLastFc);
    }
  }, [dataLastFc]);

  useEffect(() => {
    if (!savingFc) {
      getLastFc();
    }
  }, [savingFc]);

  useEffect(() => {
    oldValue === newValue ? setDisabledButton(true) : setDisabledButton(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      if (newSeconds === 1) {
        addDataFc({
          id: 'fc',
          fc: newControl.fc,
          fcSeconds: 1,
        });
      }
      setNewCounter(newControl.fc);
      updateDataFc(newControl);

      setOldValue(newControl.fc);
      setNewValue(newControl.fc);
    }
  };

  const changeCounterHandler = (fcCounter: number) => {
    if (newControl && newSeconds > 1) {
      addDataFc({
        id: 'fc',
        fc: fcCounter,
        fcSeconds: 1,
      });
    }
  };

  const changeValueHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, fc: value });
    setNewValue(value);
  };

  const changeSecondsHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, fcSeconds: value });
    setNewSeconds(value);
  };

  ///

  return (
    <ControlComponent
      title={<>Fc</>}
      disabledButton={disabledButton}
      min={1}
      max={300}
      subTittle={'lpm'}
      oldValue={oldValue}
      newValue={newValue}
      newCounter={newCounter}
      newSeconds={newSeconds}
      type={'other'}
      //
      onSaveHandler={saveHandler}
      onChangeValue={changeValueHandler}
      onChangeCounter={changeCounterHandler}
      onChangeSeconds={changeSecondsHandler}
    />
  );
};

export default ControlComponentFc;
