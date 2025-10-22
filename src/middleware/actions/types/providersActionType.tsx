import {
  PROVIDER_GETS_SUCCESS,
  PROVIDER_GET_FAIL,
  PROVIDER_MAKE_REQ,
  PROVIDER_GET_SUCCESS,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_CREATE_FAIL,
  PROVIDER_UPDATE_SUCCESS,
} from "src/middleware/types/ProviderActionTypes";
import { Provider } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequest = () => {
  return {
    type: PROVIDER_MAKE_REQ,
  };
};

export const getAllRequestSuccess = (data: Provider[]) => {
  return {
    type: PROVIDER_GETS_SUCCESS,
    payload: data,
  };
};

export const getRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const createRequestFail = (data: Provider) => {
  return {
    type: PROVIDER_CREATE_FAIL,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_UPDATE_SUCCESS,
    payload: data,
  };
};

export const getAllRequestFail = (data: []) => {
  return {
    type: PROVIDER_GET_FAIL,
    payload: data,
  };
};
