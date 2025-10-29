import { AuthState } from '@interfaces';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_UPDATE_USER_REQUEST,
  AUTH_UPDATE_USER_SUCCESS,
  AUTH_UPDATE_USER_FAILURE,
  AUTH_CLEAR_ERROR,
  AUTH_SET_LOADING,
  AUTH_CHECK_TOKEN,
  AUTH_INITIALIZE,
  AUTH_REFRESH_TOKEN_REQUEST,
  AUTH_REFRESH_TOKEN_SUCCESS,
  AUTH_REFRESH_TOKEN_FAILURE,
  AUTH_RESET_LOGIN_ATTEMPTS,
  AUTH_INCREMENT_LOGIN_ATTEMPTS,
} from '../types/AuthActionTypes';
import { logger } from '../../utils/logger';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAttempt: undefined,
};

interface AuthAction {
  type: string;
  payload?: any;
}

export const AuthReducer = (
  state = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
      logger.info('AUTH_LOGIN_SUCCESS reducer:', {
        user: action.payload.user,
        isAuthenticated: true,
      });
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        loginAttempts: 0,
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        lastLoginAttempt: new Date().toISOString(),
      };

    case AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_LOGOUT_SUCCESS:
      return {
        ...initialState, // Reset to initial state
      };

    case AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case AUTH_UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
        error: null,
      };

    case AUTH_REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_CHECK_TOKEN:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH_INITIALIZE:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_RESET_LOGIN_ATTEMPTS:
      return {
        ...state,
        loginAttempts: 0,
        lastLoginAttempt: undefined,
      };

    case AUTH_INCREMENT_LOGIN_ATTEMPTS:
      return {
        ...state,
        loginAttempts: state.loginAttempts + 1,
        lastLoginAttempt: new Date().toISOString(),
      };

    default:
      return state;
  }
};

export default AuthReducer;
