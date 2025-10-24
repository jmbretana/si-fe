import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '@common/ThemeContext';
import { useAuth } from '@auth/AuthContext';

import { getMenuListItems } from './ItemsMenu';
import { COLORS } from '@values/colors';

//

export default function MenuDesktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useThemeContext(); // Obtener el tema actual
  const { user } = useAuth(); // Obtener el usuario con su rol
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Obtener los items del menú filtrados por el rol del usuario
  const menuListItems = getMenuListItems(user?.role);

  const goToSection = (link: string) => () => {
    navigate(link);
  };

  const handleMouseEnter = (itemKey: number) => {
    setHoveredItem(itemKey);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const color =
    theme.palette.mode === 'dark'
      ? menuListItems.colorNight
      : menuListItems.color;

  const activeColor =
    theme.palette.mode === 'dark'
      ? menuListItems.activeColorNight
      : menuListItems.activeColor;

  return (
    <Stack
      sx={{
        p: 1,
        justifyContent: 'space-between',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px',
      }}
    >
      {menuListItems.items.map((item, index) => (
        <Box
          key={index}
          sx={{ position: 'relative' }}
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
        >
          <ListItem
            sx={{
              padding: '',
              ':hover': {
                color:
                  location.pathname.indexOf(item.name) > 0
                    ? activeColor
                    : color,
              },
            }}
          >
            <Box
              display={'flex'}
              onClick={goToSection(item.link)}
              sx={{
                paddingRight: '10px',
                borderRadius: '25px',
                alignContent: 'center',
                alignItems: 'center',
                padding: '2px 12px',
                gap: 1,
                background:
                  location.pathname.indexOf(item.name) > 0
                    ? activeColor
                    : 'transparent',
                color:
                  location.pathname.indexOf(item.name) > 0
                    ? COLORS.white + ' !important'
                    : COLORS.grey,

                ':hover': {
                  backgroundColor: COLORS.grey_light,
                  color: COLORS.black + ' !important',
                  cursor: 'pointer',
                },
                fontSize: '15px',
                marginBottom: '5px',
              }}
            >
              <Box pt={1}>{item.icon}</Box>
              <Box
                sx={{
                  display: { xs: 'none', lg: 'block', fontFamily: 'Lexend' },
                }}
              >
                {item.text}
              </Box>
            </Box>
          </ListItem>
        </Box>
      ))}
    </Stack>
  );
}
