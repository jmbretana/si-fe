import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading: React.FunctionComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
