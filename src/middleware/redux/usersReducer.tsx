import {
  USER_INITIAL,
  USER_MAKE_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
} from 'src/middleware/types/UserActionTypes';
import { Action, AuthUser } from '@interfaces';

interface UsersState {
  user: AuthUser | undefined;
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  user: undefined,
  status: USER_INITIAL,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const UserReducer = (
  state = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case USER_INITIAL:
      return {
        ...state,
        status: USER_INITIAL,
      };
    case USER_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Finaliza la solicitud con éxito
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        status: USER_LOGIN_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        user: action.payload as AuthUser, // Actualiza la lista de products
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        user: undefined, // Restablece la lista de products
        status: USER_LOGIN_FAIL,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        status: USER_LOGOUT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        user: action.payload as AuthUser, // Actualiza la lista de products
      };

    default:
      return state;
  }
};
