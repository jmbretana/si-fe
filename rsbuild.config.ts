import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '@actions': './src/middleware/actions',
      '@auth': './src/auth',
      '@common': './src/components/common',
      '@constants': './src/constants',
      '@components': './src/components',
      '@enum': './src/interfaces/enum',
      '@hooks': './src/hooks',
      '@interfaces': './src/interfaces',
      '@layout': './src/layout',
      '@pages': './src/pages',
      '@public': './public',
      '@redux': './src/middleware/redux',
      '@router': './src/router',
      '@services': './src/middleware/services',
      '@store': './src/middleware/store',
      '@theme': './src/components/common/theme',
      '@themeContext': './src/components/common/ThemeContext.tsx',
      '@types': './src/middleware/types',
      '@AccountActionTypes': './src/middleware/types/AccountActionTypes',
      '@AccountProviderActionTypes':
        './src/middleware/types/AccountProviderActionTypes',
      '@BudgetActionTypes': './src/middleware/types/BudgetActionTypes',
      '@ClientActionTypes': './src/middleware/types/ClientActionTypes',
      '@ComprobanteProviderActionTypes':
        './src/middleware/types/ComprobanteProviderActionTypes',
      '@CreditNoteActionTypes': './src/middleware/types/CreditNoteActionTypes',
      '@GeoActionTypes': './src/middleware/types/GeoActionTypes',
      '@ProductActionTypes': './src/middleware/types/ProductActionTypes',
      '@ProviderActionTypes': './src/middleware/types/ProviderActionTypes',
      '@SnackActionTypes': './src/middleware/types/SnackActionTypes',
      '@UserActionTypes': './src/middleware/types/UserActionTypes',
      '@utils': './src/utils',
      '@values': './src/values',
    },
  },
});
