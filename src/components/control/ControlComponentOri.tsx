import { useEffect, useState } from 'react';
import React from 'react';

import { updateOri } from '@hooks/HookUpdateOri';
import ControlComponent from './ControlComponent';

import { controlDataOri, Unify } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/middleware/store/store';
import { updateUnify } from 'src/middleware/actions/unifyActions';
import { UNIFY_SUCCESS } from '@UnifyActionTypes';

interface OriProps {
  disabled: boolean;
  unify: Unify;
  //
}

const ControlComponentOri: React.FunctionComponent<OriProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const [newControl, setNewControl] = useState<controlDataOri>();
  const [newCounter, setNewCounter] = useState<number>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [newValue, setNewValue] = useState<number>(0);
  const [oldValue, setOldValue] = useState<number>(0);

  const { loadingResetOri, resetDataOri } = updateOri();

  useEffect(() => {
    setOldValue(props.unify.ori);
    setNewValue(props.unify.ori);
    setNewControl({
      ori: props.unify.ori,
      oriSeconds: props.unify.oriSeconds,
      id: 1,
    });
    changeSecondsHandler(props.unify.oriSeconds);
  }, [props.unify]);

  useEffect(() => {
    newValue === oldValue ? setDisabledButton(true) : setDisabledButton(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      const unify: Unify = {
        ...props.unify,
        ori: newControl.ori,
        oriSeconds: newSeconds === 1 ? 1 : newControl.oriSeconds,
      };

      setNewCounter(newControl.ori);
      dispatch(updateUnify(unify));

      setOldValue(newControl.ori);
      setNewValue(newControl.ori);
    }
  };

  const changeCounterHandler = (oriCounter: number) => {
    if (newControl && newSeconds > 1) {
      const unify: Unify = {
        ...props.unify,
        ori: oriCounter,
        oriSeconds: 1,
      };
      dispatch(updateUnify(unify));
    }
  };

  const changeValueHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, ori: value });
    setNewValue(value);
  };

  const changeSecondsHandler = (value: number) => {
    if (newControl) setNewControl({ ...newControl, oriSeconds: value });
    setNewSeconds(value);
  };

  ///

  return (
    <ControlComponent
      title={<>Ori</>}
      disabledButton={disabledButton}
      min={0}
      max={10}
      subTittle={''}
      oldValue={oldValue}
      newValue={newValue}
      newCounter={newCounter}
      newSeconds={newSeconds}
      type={'ori'}
      //
      onSaveHandler={saveHandler}
      onChangeValue={changeValueHandler}
      onChangeCounter={changeCounterHandler}
      onChangeSeconds={changeSecondsHandler}
    />
  );
};

export default ControlComponentOri;
