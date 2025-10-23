import { useState } from 'react';
import React from 'react';
import ButtonUI from '../UI/Button';
import IconButtonUI from '../UI/IconButtonUI';

import CounterComponent from './utils/Counter';
import CounterComponentDecimal from './utils/CounterDecimal';

import InputUpDownComponent from '../UI/InputUpDownComponent';
import SecondsComponent from './UI/SecondsComponent';
import { transformToDecimal } from '../../utils/utils';

import Save from '@mui/icons-material/Save';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
interface ControlComponentProps {
  title: string | React.ReactNode;
  min: number;
  max: number;
  disabled?: boolean;
  disabledButton?: boolean;
  subTittle: string;
  type: 'ori' | 'other';

  oldValue: number;
  newCounter?: number;
  newValue: number;
  newSeconds: number;

  //
  onSaveHandler: () => void;
  onChangeCounter: (number: number) => void;
  onChangeValue: (number: number) => void;
  onChangeSeconds: (number: number) => void;
}

const ControlComponent: React.FunctionComponent<ControlComponentProps> = (
  props,
) => {
  const theme = useTheme();
  const hiddenSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [saving, setSaving] = useState<boolean>(false);

  //

  const saveHandler = () => {
    props.onSaveHandler();

    setTimeout(function () {
      setSaving(false);
    }, 1000);

    setSaving(true);
  };

  const onChangeCounter = (counter: number) => {
    props.onChangeCounter(counter);
  };

  const onChangeValue = (value: number) => {
    props.onChangeValue(value);
  };

  const onChangeSeconds = (seconds: number) => {
    props.onChangeSeconds(seconds);
  };

  ///

  return (
    <Box>
      {
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box className="col-2 d-flex align-items-center">
            <h1 className={`${'display-6'}`}>{props.title}</h1>
          </Box>
          <Box className="col-3 d-flex align-items-center">
            <Box className="row">
              <h1 className="display-1 text-white fw-bold">
                {props.type === 'ori'
                  ? transformToDecimal(props.newValue)
                  : props.newValue}
              </h1>
            </Box>
          </Box>
          <Box className="col-5 col-sm-5 col-md-3">
            <Box className="row d-flex">
              <Box className="">
                <InputUpDownComponent
                  min={props.min}
                  max={props.max}
                  disabled={props.disabled}
                  value={props.newValue}
                  ori={props.type === 'ori' ? true : false}
                  //
                  changeValue={onChangeValue}
                />
              </Box>
              <Box className="">
                <input
                  type="range"
                  className="form-range"
                  id="range"
                  min={props.min}
                  max={props.max}
                  step="1"
                  value={props.newValue}
                  onChange={(e) => onChangeValue(Number(e.target.value))}
                  disabled={props.disabled}
                />
              </Box>
            </Box>
            <Box className="pt-1">
              <SecondsComponent
                newSeconds={props.newSeconds}
                disabled={props.disabled}
                //
                onChangeSeconds={(value) => onChangeSeconds(value)}
              />
            </Box>
          </Box>
          <Box className="col-2">
            {!hiddenSM && (
              <ButtonUI
                title={'Update'}
                saving={saving}
                disabled={props.disabledButton}
                color={'success'}
                variant={'contained'}
                startIcon={<Save />}
                //
                onClick={saveHandler}
              />
            )}

            {hiddenSM && (
              <IconButtonUI
                color={'success'}
                disabled={props.disabledButton}
                icon={<Save />}
                //
                onClick={saveHandler}
              />
            )}
          </Box>
          {!hiddenSM && (
            <Box className="col-2 d-flex align-items-center justify-content-end">
              <h1 className="display-1 text-white fw-bold">
                {props.type === 'other' && (
                  <CounterComponent
                    oldValue={props.oldValue}
                    newValue={props.newCounter}
                    newSeconds={props.newSeconds}
                    title={props.subTittle}
                    //
                    onChangeCounter={onChangeCounter}
                  />
                )}
                {props.type === 'ori' && (
                  <CounterComponentDecimal
                    oldValue={props.oldValue}
                    newValue={props.newCounter}
                    newSeconds={props.newSeconds}
                    title={''}
                    //
                    onChangeCounter={onChangeCounter}
                  />
                )}
              </h1>
            </Box>
          )}
        </Box>
      }
    </Box>
  );
};

export default ControlComponent;
