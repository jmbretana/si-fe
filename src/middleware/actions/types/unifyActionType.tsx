import { UNIFY_FAIL, UNIFY_MAKE_REQ, UNIFY_SUCCESS } from '@UnifyActionTypes';
import { Unify } from '@interfaces';

// Acción para iniciar una solicitud
export const makeRequestUnify = () => {
  return {
    type: UNIFY_MAKE_REQ,
  };
};

export const getSuccess = (data: Unify) => {
  return {
    type: UNIFY_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: UNIFY_FAIL,
    payload: data,
  };
};
