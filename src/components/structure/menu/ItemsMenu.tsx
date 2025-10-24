import React from 'react';
import { COLORS } from '@values/colors';

import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const DASHBOARD_ALLOWED_ROLES = ['admin', 'superadmin'];

// Función para verificar si un usuario puede ver el Dashboard
const canViewDashboard = (userRole?: string): boolean => {
  if (!userRole) return false;
  return DASHBOARD_ALLOWED_ROLES.includes(userRole.toLowerCase());
};

// Función para obtener los items del menú filtrados por rol
export const getMenuListItems = (userRole?: string) => {
  const allItems = [
    {
      key: 3,
      text: 'Monitor',
      icon: <MonitorHeartIcon />,
      link: '/monitor',
      name: 'monitor',
    },
    {
      key: 1,
      text: 'Control',
      icon: <DisplaySettingsIcon />,
      link: '/control',
      name: 'control',
    },
  ];

  // Filtrar items basándose en el rol del usuario
  const filteredItems = allItems.filter((item: any) => {
    if (item.requiresRole) {
      return canViewDashboard(userRole);
    }
    return true;
  });

  return {
    color: COLORS.grey,
    colorNight: COLORS.white,
    activeColor: COLORS.black,
    activeColorNight: COLORS.blue,
    items: filteredItems,
  };
};

// Para compatibilidad hacia atrás - menu sin filtro (muestra todo)
export const menuListItems = {
  color: COLORS.grey,
  colorNight: COLORS.white,
  activeColor: COLORS.black,
  activeColorNight: COLORS.blue,
  items: [
    {
      key: 3,
      text: 'Control',
      icon: <DisplaySettingsIcon />,
      link: '/control',
      name: 'control',
    },
    {
      key: 1,
      text: 'Monitor',
      icon: <MonitorHeartIcon />,
      link: '/monitor',
      name: 'monitor',
    },
  ],
};

// Función para obtener los items del menú mobile filtrados por rol
export const getMenuListItemsMobile = (userRole?: string) => {
  const allItems = [
    {
      key: 5,
      text: 'Control',
      icon: <DisplaySettingsIcon />,
      link: '/control',
      name: 'control',
    },
    {
      key: 0,
      text: 'Monitor',
      icon: <MonitorHeartIcon />,
      link: '/monitor',
      name: 'monitor',
      requiresRole: true, // Marca que requiere verificación de rol
    },
  ];

  // Filtrar items basándose en el rol del usuario
  const filteredItems = allItems.filter((item) => {
    if (item.requiresRole) {
      return canViewDashboard(userRole);
    }
    return true;
  });

  return {
    color: COLORS.grey,
    colorNight: COLORS.white,
    activeColor: COLORS.black,
    activeColorNight: COLORS.blue,
    items: filteredItems,
  };
};

export const menuListItemsMobile = {
  color: COLORS.grey,
  colorNight: COLORS.white,
  activeColor: COLORS.black,
  activeColorNight: COLORS.blue,
  items: [
    {
      key: 3,
      text: 'Control',
      icon: <DisplaySettingsIcon />,
      link: '/control',
      name: 'control',
    },
    {
      key: 4,
      text: 'Monitor',
      icon: <MonitorHeartIcon />,
      link: '/monitor',
      name: 'monitor',
    },
  ],
};
