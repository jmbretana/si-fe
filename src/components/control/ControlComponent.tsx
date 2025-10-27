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
import { Box, Grid, Slider, Typography } from '@mui/material';
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', md: 'center' },
        gap: 3,
        p: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '16px',
          minWidth: { xs: '100%', md: '300px' },
          flex: { md: 1 },
          display: 'flex',
          height: '100%',
        }}
      >
        <Box
          sx={{
            minWidth: { xs: '100%', md: '200px' },
            maxWidth: { xs: '100%', md: '200px' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgb(187, 187, 187)',
              fontSize: '2.5em',
            }}
          >
            {props.title}
          </Typography>
        </Box>

        <Box
          sx={{
            minWidth: { xs: '100%', md: '150px' },
            maxWidth: { xs: '100%', md: '150px' },
            textAlign: 'right',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
            }}
          >
            {props.type === 'ori'
              ? transformToDecimal(props.newValue)
              : props.newValue}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          minWidth: { xs: '100%', md: '300px' },
          flex: { md: 1 },
        }}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
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
          <Box>
            <Slider
              min={props.min}
              max={props.max}
              value={props.newValue}
              onChange={(e, newValue) =>
                onChangeValue(
                  Array.isArray(newValue) ? newValue[0] : (newValue as number),
                )
              }
              disabled={props.disabled}
              style={{
                width: '100%',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ pt: 1 }}>
          <SecondsComponent
            newSeconds={props.newSeconds}
            disabled={props.disabled}
            //
            onChangeSeconds={(value) => onChangeSeconds(value)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          minWidth: { xs: '100%', md: '120px' },
          maxWidth: { xs: '100%', md: '120px' },
        }}
      >
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

      {/* Contador - responsive (solo visible en pantallas grandes) */}
      {!hiddenSM && (
        <Box
          sx={{
            minWidth: { xs: '100%', md: '180px' },
            maxWidth: { xs: '100%', md: '180px' },
            textAlign: { xs: 'center', md: 'right' },
          }}
          gap={2}
        >
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
  );
};

export default ControlComponent;
