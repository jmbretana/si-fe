import React from 'react';
import InputUpDownComponent from '../../UI/InputUpDownComponent';
import { Box, Slider } from '@mui/material';
interface SecondsComponentProps {
  newSeconds: number;
  disabled?: boolean;
  //
  onChangeSeconds: (number: number) => void;
}

const SecondsComponent: React.FunctionComponent<SecondsComponentProps> = (
  props,
) => {
  return (
    <Box className="row pt-2">
      <Box>
        <Box className="row">
          <Box className="col-2">
            <p className="fs-6 fw-lighter text-white pt-1">Seg</p>
          </Box>
          <Box>
            <InputUpDownComponent
              value={props.newSeconds ? props.newSeconds : 1}
              min={1}
              max={60}
              disabled={props.disabled}
              //
              changeValue={(value) => props.onChangeSeconds(value)}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Slider
          min={1}
          max={60}
          value={props.newSeconds ? props.newSeconds : 1}
          onChange={(e, newValue) =>
            props.onChangeSeconds(
              Array.isArray(newValue) ? newValue[0] : (newValue as number),
            )
          }
          disabled={props.disabled}
        />
      </Box>
    </Box>
  );
};

export default SecondsComponent;
