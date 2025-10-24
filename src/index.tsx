import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import { router } from '@router';
import { store } from 'src/middleware/store/store';
import { AuthProvider } from '@auth/AuthContext';
import { ThemeProviderWrapper } from '@themeContext';
import AuthInitializer from './components/auth/AuthInitializer';

// Initialize global logger controls
import './utils/loggerGlobal';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <Helmet>
        <title>Simon</title>
        <link
          rel="icon"
          type="image/png"
          href="favicon.ico"
          sizes="16x16"
          data-react-helmet="true"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <AuthProvider>
            <AuthInitializer>
              <RouterProvider router={router} />
            </AuthInitializer>
          </AuthProvider>
        </ThemeProviderWrapper>
      </Provider>
    </React.StrictMode>,
  );
}
