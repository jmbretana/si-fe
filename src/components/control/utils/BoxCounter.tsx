import React from 'react';
import { Box, Typography } from '@mui/material';

interface BoxCounterProps {
  counter: string | number | undefined;
  title: string;
}

const BoxCounter: React.FunctionComponent<BoxCounterProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
      gap={1}
    >
      <Typography
        sx={{
          fontSize: '1.5em',
          fontWeight: 600,
          padding: 0,
        }}
      >
        {props.counter}
      </Typography>
      <Typography
        sx={{
          fontSize: '1.2em',
          color: 'rgb(187, 187, 187)',
          margin: 0,
          paddingBottom: '4px',
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
};

export default BoxCounter;
