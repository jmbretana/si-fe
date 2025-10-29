import {
  ORI_MAKE_REQ,
  ORI_CREATE_FAIL,
  ORI_CREATE_SUCCESS,
  ORI_GET_FAIL,
  ORI_GET_SUCCESS,
  ORI_GET_LAST_FAIL,
  ORI_GET_LAST_SUCCESS,
  ORI_UPDATE_FAIL,
  ORI_UPDATE_SUCCESS,
} from '@OriActionTypes';
import { controlDataOri } from '@interfaces';

// Acción para iniciar una solicitud
export const makeRequestOri = () => {
  return {
    type: ORI_MAKE_REQ,
  };
};

export const createRequestSuccess = (data: controlDataOri) => {
  return {
    type: ORI_CREATE_SUCCESS,
    payload: data,
  };
};

export const getSuccess = (data: controlDataOri) => {
  return {
    type: ORI_GET_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: ORI_GET_FAIL,
    payload: data,
  };
};

export const updateRequestSuccess = (data: controlDataOri) => {
  return {
    type: ORI_UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestFail = (data: any) => {
  return {
    type: ORI_UPDATE_FAIL,
    payload: data,
  };
};
