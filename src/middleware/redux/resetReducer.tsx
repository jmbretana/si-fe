import {
  RESET_SUCCESS,
  RESET_FAIL,
  RESET_MAKE_REQ,
} from 'src/middleware/types/ResetActionTypes';
import { Action, Reset } from '@interfaces';

interface ResetState {
  status: string;
  dataReset: Reset | undefined;
  error: string | null;
  isLoading: boolean;
}

const initialState: ResetState = {
  dataReset: undefined,
  status: RESET_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const ResetReducer = (
  state = initialState,
  action: Action,
): ResetState => {
  switch (action.type) {
    case RESET_MAKE_REQ:
      return {
        ...state,
        status: RESET_MAKE_REQ,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        dataReset: action.payload as Reset,
        status: RESET_SUCCESS,
        isLoading: false,
      };
    case RESET_FAIL:
      return {
        ...state,
        isLoading: false,
        status: RESET_FAIL,
      };
    default:
      return state;
  }
};
