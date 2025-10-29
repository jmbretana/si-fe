import { configureStore } from '@reduxjs/toolkit';

import { AuthReducer } from 'src/middleware/redux/authReducer';
import { ResetReducer } from 'src/middleware/redux/resetReducer';
import { SnackReducer } from 'src/middleware/redux/snackReducer';
import { UnifyReducer } from 'src/middleware/redux/unifyReducer';
import { UserReducer } from 'src/middleware/redux/usersReducer';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    reset: ResetReducer,
    snack: SnackReducer,
    unify: UnifyReducer,
    users: UserReducer,
  },
});

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
