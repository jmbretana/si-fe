import {
  ORI_CREATE_FAIL,
  ORI_CREATE_SUCCESS,
  ORI_GET_FAIL,
  ORI_GET_SUCCESS,
  ORI_GET_LAST_FAIL,
  ORI_GET_LAST_SUCCESS,
  ORI_UPDATE_FAIL,
  ORI_UPDATE_SUCCESS,
  ORI_MAKE_REQ,
} from '@OriActionTypes';
import { Action, controlDataOri } from '@interfaces';

interface OriState {
  status: string;
  error: string | null;
  isLoading: boolean;
  data: controlDataOri | null;
}

const initialState: OriState = {
  status: ORI_MAKE_REQ,
  error: null,
  isLoading: false,
  data: null,
};

export const OriReducer = (state = initialState, action: Action): OriState => {
  switch (action.type) {
    case ORI_MAKE_REQ:
      return {
        ...state,
        status: ORI_MAKE_REQ,
        isLoading: true,
      };

    case ORI_GET_SUCCESS:
      return {
        ...state,
        status: ORI_GET_SUCCESS,
        isLoading: false,
        data: action.payload as controlDataOri,
        error: null,
      };

    case ORI_GET_FAIL:
      return {
        ...state,
        status: ORI_GET_FAIL,
        isLoading: false,
        error: (action.payload as unknown) as string,
      };

    case ORI_GET_LAST_SUCCESS:
      return {
        ...state,
        status: ORI_GET_LAST_SUCCESS,
        isLoading: false,
        data: action.payload as controlDataOri,
        error: null,
      };

    case ORI_GET_LAST_FAIL:
      return {
        ...state,
        status: ORI_GET_LAST_FAIL,
        isLoading: false,
        error: (action.payload as unknown) as string,
      };

    case ORI_CREATE_SUCCESS:
      return {
        ...state,
        status: ORI_CREATE_SUCCESS,
        isLoading: false,
        error: null,
      };

    case ORI_CREATE_FAIL:
      return {
        ...state,
        status: ORI_CREATE_FAIL,
        isLoading: false,
        error: (action.payload as unknown) as string,
      };

    case ORI_UPDATE_SUCCESS:
      return {
        ...state,
        status: ORI_UPDATE_SUCCESS,
        isLoading: false,
        data: action.payload as controlDataOri,
        error: null,
      };

    case ORI_UPDATE_FAIL:
      return {
        ...state,
        status: ORI_UPDATE_FAIL,
        isLoading: false,
        error: (action.payload as unknown) as string,
      };

    default:
      return state;
  }
};
