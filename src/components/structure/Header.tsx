import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, useMediaQuery } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TerrainIcon from '@mui/icons-material/Terrain';

import { useAuth } from '@auth/AuthContext';
import { COLORS } from '@values/colors';
import { logger } from '@utils/logger';

import MenuDesktop from './menu/MenuDesktop';
import MenuMobile from './menu/MenuMobile';

import SwitchTheme from '@common/SwitchTheme';
import { useThemeContext } from '@common/ThemeContext';

import HeaderUser from '@components/structure/HeaderUser';

function HeaderComponent() {
  const { theme } = useThemeContext(); // Obtener el tema actual
  const { isAuthenticated } = useAuth(); // Obtener estado de autenticación
  const isMobile = useMediaQuery('(max-width:900px)'); // Detectar si la resolución es móvil

  // Debug: Monitor header rendering decisions
  useEffect(() => {
    logger.info(
      `Header: Rendering decision - isMobile: ${isMobile}, isAuthenticated: ${isAuthenticated}`,
    );
    if (!isMobile && !isAuthenticated) {
      logger.warn(
        'Header: Showing unauthenticated desktop header (session might be expired)',
      );
    }
  }, [isMobile, isAuthenticated]);

  const viewDesktopMenu = (
    <AppBar
      component="nav"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? COLORS.black : COLORS.white,
        height: '64px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'}>
          <TerrainIcon
            sx={{
              color:
                theme.palette.mode === 'dark' ? COLORS.white : COLORS.grey_dark,
              fontSize: '40px',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === 'dark' ? COLORS.white : COLORS.grey_dark,
              flexGrow: 1,
              fontWeight: 450,
              fontFamily: 'Lexend, Arial, Helvetica, sans-serif',
              display: { lg: 'none', xl: 'block' }, // Oculta en mobile (xs y sm)
              paddingLeft: '8px',
              pt: '3px',
              pb: '2px',
            }}
          >
            new terra
          </Typography>
        </Box>

        {isAuthenticated && <MenuDesktop />}

        <Box display={'flex'}>
          <SwitchTheme />

          {isAuthenticated && <HeaderUser />}
        </Box>
      </Toolbar>
    </AppBar>
  );

  const viewDesktopUnauthenticated = (
    <AppBar
      component="nav"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? COLORS.black : COLORS.white,
        height: '64px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'}>
          <TerrainIcon
            sx={{
              color:
                theme.palette.mode === 'dark' ? COLORS.white : COLORS.grey_dark,
              fontSize: '40px',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === 'dark' ? COLORS.white : COLORS.grey_dark,
              flexGrow: 1,
              fontWeight: 450,
              fontFamily: 'Lexend, Arial, Helvetica, sans-serif',
              display: { lg: 'none', xl: 'block' },
              paddingLeft: '8px',
              pt: '3px',
              pb: '2px',
            }}
          >
            new terra
          </Typography>
        </Box>

        <Box display={'flex'}>
          <SwitchTheme />
        </Box>
      </Toolbar>
    </AppBar>
  );

  const viewDesktopMobile = (
    <AppBar
      component="nav"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? COLORS.black : COLORS.white,
        height: '60px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'}>
          <TerrainIcon
            sx={{
              color:
                theme.palette.mode === 'dark' ? COLORS.white : COLORS.grey_dark,
              fontSize: '40px',
            }}
          />
        </Box>

        <Box display={'flex'} flexDirection={'column'}>
          <MenuMobile />
        </Box>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor:
          theme.palette.mode === 'dark' ? COLORS.black : COLORS.white,
      }}
    >
      <CssBaseline />
      {!isMobile && isAuthenticated && viewDesktopMenu}
      {!isMobile && !isAuthenticated && viewDesktopUnauthenticated}
      {isMobile && viewDesktopMobile}

      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

HeaderComponent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default HeaderComponent;
