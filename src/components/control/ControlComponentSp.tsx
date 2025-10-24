import { useEffect, useState } from 'react';
import React from 'react';
import { controlDataSp } from '../../interfaces';
import { HookUpdateSp } from '../../hooks/HookUpdateSp';
import ControlComponent from './ControlComponent';
interface SpProps {
  disabled?: boolean;
  //
  onDisableOri: (disable: boolean) => void;
}

const ControlComponentSp: React.FunctionComponent<SpProps> = (props) => {
  const [disabledButton, setDisabled] = useState<boolean>(true);
  const [newControl, setNewControl] = useState<controlDataSp>();
  const [newCounter, setNewCounter] = useState<number>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [newValue, setNewValue] = useState<number>(0);
  const [oldValue, setOldValue] = useState<number>(0);

  const {
    dataSp,
    getDataSp,
    dataLastSp,
    getLastSp,
    addDataSp,
    loadingResetSp,
    savingSp,
    updateDataSp,
  } = HookUpdateSp();

  useEffect(() => {
    if (!dataSp) getDataSp();
    if (!dataLastSp) getLastSp();
  }, []);

  useEffect(() => {
    if (loadingResetSp) {
      getDataSp();
      getLastSp();
    }
  }, [loadingResetSp]);

  useEffect(() => {
    console.log('dataSp changed', dataSp);
    if (dataSp) {
      setOldValue(dataSp.sp);

      setNewValue(dataSp.sp);
      changeSecondsHandler(dataSp.spSeconds);

      if (dataSp.sp < 100) props.onDisableOri(true);
    }
  }, [dataSp]);

  useEffect(() => {
    if (dataLastSp) {
      setNewControl(dataLastSp);
    }
  }, [dataLastSp]);

  useEffect(() => {
    if (!savingSp) {
      getLastSp();
    }
  }, [savingSp]);

  useEffect(() => {
    oldValue === newValue ? setDisabled(true) : setDisabled(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      if (newSeconds === 1) {
        addDataSp({
          id: 'sp',
          sp: newControl.sp,
          spSeconds: 1,
        });
      }

      setNewCounter(newControl.sp);
      updateDataSp(newControl);

      setOldValue(newControl.sp);
      setNewValue(newControl.sp);

      newControl.sp < 100
        ? props.onDisableOri(true)
        : props.onDisableOri(false);
    }
  };

  const changeCounterHandler = (spCounter: number) => {
    if (newControl && newSeconds > 1) {
      addDataSp({
        id: 'sp',
        sp: spCounter,
        spSeconds: 1,
      });
    }
  };

  const changeValueHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, sp: value });
    setNewValue(value);
  };

  const changeSecondsHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, spSeconds: value });
    setNewSeconds(value);
  };

  ///

  return (
    <ControlComponent
      title={
        <>
          Sp0<sub>2</sub>
        </>
      }
      disabledButton={disabledButton}
      min={1}
      max={100}
      subTittle={'%'}
      oldValue={oldValue}
      newValue={newValue}
      newCounter={newCounter}
      newSeconds={newSeconds}
      type="other"
      //
      onSaveHandler={saveHandler}
      onChangeValue={changeValueHandler}
      onChangeCounter={changeCounterHandler}
      onChangeSeconds={changeSecondsHandler}
    />
  );
};

export default ControlComponentSp;
