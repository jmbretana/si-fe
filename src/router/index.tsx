import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import LayoutPrivate from '@layout/LayoutPrivate';
import LayoutRoot from '@layout/LayoutRoot';

import Login from '@pages/PageLogin';
import Dashboard from '@pages/PageDashboard.tsx';

import ClientsComponent from '@components/clients';
import ConfigComponent from '@components/configParams';
import ProductsComponent from '@components/products';
import ProductsFormComponent from '@components/products/ProductsFormComponent.tsx';
import Provider from '@components/provider';
import Providers from '@components/providers';

import ProtectedRoute from '@layout/ProtectedRoute.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,
    children: [
      {
        path: '/',
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/dashboard',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/clientes',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ClientsComponent />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '/configuracion',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ConfigComponent />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/productos',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProductsComponent />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '/producto/:id',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProductsFormComponent />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '/proveedores',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Providers />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '/proveedor/:id',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Provider />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '*',
        element: <Navigate to="/presupuestos" replace />,
      },
    ],
  },
]);
