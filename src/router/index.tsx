import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import LayoutPrivate from '@layout/LayoutPrivate';
import LayoutRoot from '@layout/LayoutRoot';

import Login from '@pages/PageLogin';
import Home from '@pages/PageHome';

import Monitor from '@components/monitor';

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
        path: '/home',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '/monitor',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Monitor />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: '*',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
