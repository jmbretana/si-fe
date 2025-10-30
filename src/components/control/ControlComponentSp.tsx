import { useEffect, useState } from 'react';
import React from 'react';
import { controlDataSp } from '@interfaces';
import { HookUpdateSp } from '@hooks/HookUpdateSp';
import ControlComponent from './ControlComponent';

import { Unify } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/middleware/store/store';
import { updateUnify } from 'src/middleware/actions/unifyActions';
import { UNIFY_SUCCESS } from '@UnifyActionTypes';
interface SpProps {
  disabled?: boolean;
  unify: Unify;
  //
  onDisableOri: (disable: boolean) => void;
}

const ControlComponentSp: React.FunctionComponent<SpProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [disabledButton, setDisabled] = useState<boolean>(true);
  const [newControl, setNewControl] = useState<controlDataSp>();
  const [newCounter, setNewCounter] = useState<number>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [newValue, setNewValue] = useState<number>(0);
  const [oldValue, setOldValue] = useState<number>(0);

  const { addDataSp, loadingResetSp, savingSp, updateDataSp } = HookUpdateSp();

  useEffect(() => {
    if (props.unify) {
      setOldValue(props.unify.sp);
      setNewValue(props.unify.sp);
      changeSecondsHandler(props.unify.spSeconds);
      setNewControl({
        sp: props.unify.sp,
        spSeconds: props.unify.spSeconds,
        id: 1,
      });

      if (props.unify.sp < 100) props.onDisableOri(true);
    }
  }, [props.unify.sp]);

  useEffect(() => {
    oldValue === newValue ? setDisabled(true) : setDisabled(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      const unify: Unify = {
        ...props.unify,
        sp: newControl.sp,
        spSeconds: newSeconds === 1 ? 1 : newControl.spSeconds,
      };

      setNewCounter(newControl.sp);
      dispatch(updateUnify(unify));

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
        id: 1,
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
