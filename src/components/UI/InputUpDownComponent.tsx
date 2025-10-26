import React from 'react';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { transformToDecimal, invertDecimal } from '@utils/utils';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Input } from '@common/input';
import { BorderRight } from '@mui/icons-material';

interface InputUpDownComponentProps {
  value: number;
  disabled?: boolean;
  min: number;
  max: number;
  ori?: boolean;
  //

  changeValue: (number: number) => void;
}

const InputUpDownComponent: React.FunctionComponent<
  InputUpDownComponentProps
> = (props) => {
  const [newValue, setNewValue] = useState<string>(
    props.value ? props.value.toString() : '',
  );

  useEffect(() => {
    if (props.ori) {
      setNewValue(transformToDecimal(Number(props.value))!);
    } else {
      setNewValue(props.value ? props.value.toString() : '');
    }
  }, [props.value]);

  const upValue = (value: string) => {
    let localValue = Number(value);

    if (props.ori) {
      localValue = invertDecimal(localValue);
    }

    if (value && localValue < props.max) {
      ++localValue;
      props.changeValue(localValue);
    }
  };

  const downValue = (value: string) => {
    let localValue = Number(value);

    if (props.ori) {
      localValue = invertDecimal(localValue);
    }

    if (value && localValue > props.min) {
      --localValue;
      props.changeValue(localValue);
    }
  };

  const editValue = (v: string) => {
    let value: number;

    if (v !== '') {
      if (props.ori) {
        value = Number(transformToDecimal(Number(v)));
      } else {
        value = v ? Number(v) : 0;
      }
    } else value = 0;

    value = Number(value);
    if (value > props.max) value = props.max;
    if (value < props.min) value = props.min;

    setNewValue(value ? value.toString() : '');
    props.changeValue(value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Input
        id="value"
        name="value"
        label=""
        value={newValue}
        onChange={editValue}
      />
      <ButtonGroup variant="outlined">
        <Button
          onClick={() => downValue(newValue)}
          disabled={props.disabled}
          color="inherit"
          sx={{
            height: '35px',
            backgroundColor: '#666',
            border: '1px solid #000',
          }}
        >
          <FaArrowCircleDown />
        </Button>
        <Button
          onClick={() => upValue(newValue)}
          disabled={props.disabled}
          color="inherit"
          sx={{
            height: '35px',
            backgroundColor: '#333',

            border: '1px solid #000',
          }}
        >
          <FaArrowCircleUp />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default InputUpDownComponent;
