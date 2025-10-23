import React from 'react';
import { Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { Box } from '@mui/material';

interface ControlBarProps {
  beep: boolean;
  //
  onChangeBeep: (beep: boolean) => void;
}

const ControlBar: React.FunctionComponent<ControlBarProps> = (props) => {
  const [beep, setBeep] = useState<boolean>(props.beep);

  const enableBeep = () => {
    setBeep(true);
    props.onChangeBeep(true);
  };

  const disableBeep = () => {
    setBeep(false);
    props.onChangeBeep(false);
  };

  props.beep;

  return (
    <Box className="d-flex pb-3 flex-row-reverse">
      {!beep && (
        <Button
          variant="contained"
          startIcon={<NotificationsIcon />}
          color="success"
          onClick={enableBeep}
        >
          Activar
        </Button>
      )}
      {beep && (
        <Button
          variant="outlined"
          startIcon={<NotificationsIcon />}
          color="success"
          onClick={disableBeep}
        >
          Desactivar
        </Button>
      )}
    </Box>
  );
};

export default ControlBar;
