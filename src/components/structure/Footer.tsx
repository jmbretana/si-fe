import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '@values/colors';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.black,
        textAlign: 'center',
        color: COLORS.grey_light,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="body2">
          &copy; {currentYear} Brogi. All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
