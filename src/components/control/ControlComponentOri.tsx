import { useEffect, useState } from "react";
import React from "react";
import { controlDataOri } from "../../interfaces";

import { updateOri } from "../../hooks/HookUpdateOri";
import ControlComponent from "./ControlComponent";
import Box from "@mui/system/Box";

interface OriProps {
  disabled: boolean;
  //
}

const ControlComponentOri: React.FunctionComponent<OriProps> = (props) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const [newControl, setNewControl] = useState<controlDataOri>();
  const [newCounter, setNewCounter] = useState<number>();
  const [newSeconds, setNewSeconds] = useState<number>(1);
  const [newValue, setNewValue] = useState<number>(0);
  const [oldValue, setOldValue] = useState<number>(0);

  const {
    dataLastOri,
    getLastOri,
    addDataOri,
    loadingResetOri,
    resetDataOri,
    updateDataOri,
  } = updateOri();

  useEffect(() => {
    if (dataLastOri.length === 0) getLastOri();
  }, []);

  useEffect(() => {
    if (props.disabled) resetDataOri();
  }, [props.disabled]);

  useEffect(() => {
    if (dataLastOri.length > 0) {
      setOldValue(dataLastOri[0].ori);
      setNewValue(dataLastOri[0].ori);
      setNewControl(dataLastOri[0]);
      changeSecondsHandler(dataLastOri[0].oriSeconds);
    }
  }, [dataLastOri]);

  useEffect(() => {
    if (loadingResetOri) {
      getLastOri();
    }
  }, [loadingResetOri]);

  useEffect(() => {
    newValue === oldValue ? setDisabledButton(true) : setDisabledButton(false);
  }, [oldValue, newValue]);

  //

  const saveHandler = () => {
    if (newControl) {
      if (newSeconds === 1)
        addDataOri({
          id: "ori",
          ori: newControl.ori,
          oriSeconds: 1,
        });

      setNewCounter(newControl.ori);
      updateDataOri(newControl);

      setOldValue(newControl.ori);
      setNewValue(newControl.ori);
    }
  };

  const changeCounterHandler = (oriCounter: number) => {
    if (newControl && newSeconds > 1) {
      addDataOri({
        id: "ori",
        ori: oriCounter,
        oriSeconds: 1,
      });
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
    <Box padding={"12px"}>
      <ControlComponent
        title={<>Ori</>}
        disabledButton={disabledButton}
        min={0}
        max={10}
        subTittle={""}
        oldValue={oldValue}
        newValue={newValue}
        newCounter={newCounter}
        newSeconds={newSeconds}
        type={"ori"}
        //
        onSaveHandler={saveHandler}
        onChangeValue={changeValueHandler}
        onChangeCounter={changeCounterHandler}
        onChangeSeconds={changeSecondsHandler}
      />
    </Box>
  );
};

export default ControlComponentOri;
