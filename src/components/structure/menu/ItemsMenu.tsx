import React from 'react';
import { COLORS } from '@values/colors';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

// Roles permitidos para ver el Dashboard
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
      icon: <MonetizationOnOutlinedIcon />,
      link: '/monitor',
      name: 'monitor',
    },
    {
      key: 1,
      text: 'Control',
      icon: <GroupOutlinedIcon />,
      link: '/control',
      name: 'control',
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

// Para compatibilidad hacia atrás - menu sin filtro (muestra todo)
export const menuListItems = {
  color: COLORS.grey,
  colorNight: COLORS.white,
  activeColor: COLORS.black,
  activeColorNight: COLORS.blue,
  items: [
    {
      key: 3,
      text: 'Presupuestos',
      icon: <MonetizationOnOutlinedIcon />,
      link: '/presupuestos',
      name: 'presupuesto',
    },
    {
      key: 4,
      text: 'Balance',
      icon: <AccountBalanceIcon />,
      link: '/balance',
      name: 'balance',
      options: [
        {
          key: 0,
          text: 'Caja',
          icon: <PointOfSaleIcon />,
          link: '/caja',
          name: 'caja',
          parent: 'balance',
        },
        {
          key: 0,
          text: 'Cuenta corriente',
          icon: <AccountBalanceIcon />,
          link: '/balance',
          name: 'ctacte',
          parent: 'balance',
        },
      ],
    },
    {
      key: 1,
      text: 'Clientes',
      icon: <GroupOutlinedIcon />,
      link: '/clientes',
      name: 'cliente',
    },
    {
      key: 2,
      text: 'Productos',
      icon: <Inventory2OutlinedIcon />,
      link: '/productos',
      name: 'producto',
    },
    {
      key: 5,
      text: 'Distribucion',
      icon: <LocalShippingIcon />,
      link: '/distribucion',
      name: 'distribucion',
    },
    {
      key: 5,
      text: 'Proveedores',
      icon: <StorefrontIcon />,
      link: '/proveedores',
      name: 'proveedores',
    },
    {
      key: 0,
      text: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
      link: '/dashboard',
      name: 'dashboard',
    },
  ],
};

// Función para obtener los items del menú mobile filtrados por rol
export const getMenuListItemsMobile = (userRole?: string) => {
  const allItems = [
    {
      key: 3,
      text: 'Presupuestos',
      icon: <MonetizationOnOutlinedIcon />,
      link: '/presupuestos',
      name: 'presupuesto',
    },
    {
      key: 4,
      text: 'Cuentas Corrientes',
      icon: <AccountBalanceIcon />,
      link: '/balance',
      name: 'balance',
    },
    {
      key: 10,
      text: 'Caja',
      icon: <PointOfSaleIcon />,
      link: '/caja',
      name: 'caja',
    },
    {
      key: 1,
      text: 'Clientes',
      icon: <GroupOutlinedIcon />,
      link: '/clientes',
      name: 'cliente',
    },
    {
      key: 2,
      text: 'Productos',
      icon: <Inventory2OutlinedIcon />,
      link: '/productos',
      name: 'producto',
    },
    {
      key: 5,
      text: 'Distribucion',
      icon: <LocalShippingIcon />,
      link: '/distribucion',
      name: 'distribucion',
    },
    {
      key: 5,
      text: 'Proveedores',
      icon: <StorefrontIcon />,
      link: '/proveedores',
      name: 'proveedores',
    },
    {
      key: 0,
      text: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
      link: '/dashboard',
      name: 'dashboard',
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
      text: 'Presupuestos',
      icon: <MonetizationOnOutlinedIcon />,
      link: '/presupuestos',
      name: 'presupuesto',
    },
    {
      key: 4,
      text: 'Cuentas Corrientes',
      icon: <AccountBalanceIcon />,
      link: '/balance',
      name: 'balance',
    },
    {
      key: 10,
      text: 'Caja',
      icon: <PointOfSaleIcon />,
      link: '/caja',
      name: 'caja',
    },
    {
      key: 1,
      text: 'Clientes',
      icon: <GroupOutlinedIcon />,
      link: '/clientes',
      name: 'cliente',
    },
    {
      key: 2,
      text: 'Productos',
      icon: <Inventory2OutlinedIcon />,
      link: '/productos',
      name: 'producto',
    },
    {
      key: 5,
      text: 'Distribucion',
      icon: <LocalShippingIcon />,
      link: '/distribucion',
      name: 'distribucion',
    },
    {
      key: 5,
      text: 'Proveedores',
      icon: <StorefrontIcon />,
      link: '/proveedores',
      name: 'proveedores',
    },
    {
      key: 0,
      text: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
      link: '/dashboard',
      name: 'dashboard',
    },
  ],
};
