import { RESET_SUCCESS, RESET_MAKE_REQ, RESET_FAIL } from '@ResetActionTypes';
import { controlDataOri } from '@interfaces';

// Acción para iniciar una solicitud
export const makeRequestReset = () => {
  return {
    type: RESET_MAKE_REQ,
  };
};

export const getSuccess = (data: controlDataOri) => {
  return {
    type: RESET_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: RESET_FAIL,
    payload: data,
  };
};
