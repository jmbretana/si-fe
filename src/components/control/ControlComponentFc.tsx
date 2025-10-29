import { useEffect, useState } from 'react';
import React from 'react';
import { controlDataFc } from '@interfaces';
import { HookUpdateFc } from '@hooks/HookUpdateFc';
import ControlComponent from './ControlComponent';

import { Unify } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/middleware/store/store';
import { updateUnify } from 'src/middleware/actions/unifyActions';
import { UNIFY_SUCCESS } from '@UnifyActionTypes';

interface FcProps {
  unify: Unify;
  //
}

const ControlComponentFc: React.FunctionComponent<FcProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [newControl, setNewControl] = useState<controlDataFc>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [oldValue, setOldValue] = useState<number>(0);
  const [newValue, setNewValue] = useState<number>(0);
  const [newCounter, setNewCounter] = useState<number>();

  const { addDataFc, loadingResetFc, savingFc, updateDataFc } = HookUpdateFc();

  useEffect(() => {
    if (props.unify.fc) {
      setOldValue(props.unify.fc);
      setNewValue(props.unify.fc);
      setNewControl({
        fc: props.unify.fc,
        fcSeconds: props.unify.fcSeconds,
        id: 'fc',
      });
      changeSecondsHandler(props.unify.fcSeconds);
    }
  }, [props.unify.fc]);

  useEffect(() => {
    oldValue === newValue ? setDisabledButton(true) : setDisabledButton(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      const unify: Unify = {
        ...props.unify,
        fc: newControl.fc,
        fcSeconds: newSeconds === 1 ? 1 : newControl.fcSeconds,
      };

      setNewCounter(newControl.fc);
      dispatch(updateUnify(unify));
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
