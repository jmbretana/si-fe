import React from 'react';
import InputUpDownComponent from '../../UI/InputUpDownComponent';
<<<<<<< Updated upstream

=======
import { Box, Slider } from '@mui/material';
>>>>>>> Stashed changes
interface SecondsComponentProps {
  newSeconds: number;
  disabled?: boolean;
  //
<<<<<<< Updated upstream
  onChangeSeconds: (number) => void;
=======
  onChangeSeconds: (numbe: number) => void;
>>>>>>> Stashed changes
}

const SecondsComponent: React.FunctionComponent<SecondsComponentProps> = (
  props,
) => {
  return (
<<<<<<< Updated upstream
    <div className="row pt-2">
      <div>
        <div className="row">
          <div className="col-2">
            <p className="fs-6 fw-lighter text-white pt-1">Seg</p>
          </div>
          <div>
=======
    <Box className="row pt-2">
      <Box>
        <Box className="row">
          <Box className="col-2">
            <p className="fs-6 fw-lighter text-white pt-1">Seg</p>
          </Box>
          <Box>
>>>>>>> Stashed changes
            <InputUpDownComponent
              value={props.newSeconds ? props.newSeconds : 1}
              min={1}
              max={60}
              disabled={props.disabled}
              //
              changeValue={(value) => props.onChangeSeconds(value)}
            />
<<<<<<< Updated upstream
          </div>
        </div>
      </div>
      <div>
        <input
          type="range"
          className="form-range"
          id="range"
          min="1"
          max="60"
          step="1"
          value={props.newSeconds ? props.newSeconds : ''}
          onChange={(e) => props.onChangeSeconds(Number(e.target.value))}
          disabled={props.disabled}
          style={{
            paddingTop: '15px',
            width: '100%',
          }}
        />
      </div>
    </div>
=======
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
>>>>>>> Stashed changes
  );
};

export default SecondsComponent;
