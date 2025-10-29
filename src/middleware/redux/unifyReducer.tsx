import {
  UNIFY_MAKE_REQ,
  UNIFY_SUCCESS,
  UNIFY_FAIL,
} from 'src/middleware/types/UnifyActionTypes';
import { Action, Unify } from '@interfaces';

interface UnifyState {
  statusUnify: string;
  dataUnify: Unify | undefined;
  error: string | null;
  isLoading: boolean;
}

const initialState: UnifyState = {
  dataUnify: undefined,
  statusUnify: UNIFY_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const UnifyReducer = (
  state = initialState,
  action: Action,
): UnifyState => {
  switch (action.type) {
    case UNIFY_MAKE_REQ:
      return {
        ...state,
        statusUnify: UNIFY_MAKE_REQ,
      };
    case UNIFY_SUCCESS:
      return {
        ...state,
        dataUnify: action.payload as Unify,
        statusUnify: UNIFY_SUCCESS,
        isLoading: false,
      };
    case UNIFY_FAIL:
      return {
        ...state,
        isLoading: false,
        statusUnify: UNIFY_FAIL,
      };
    default:
      return state;
  }
};
