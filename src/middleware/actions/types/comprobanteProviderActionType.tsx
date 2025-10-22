import {
  COMPROBANTE_PROVIDER_CREATE_SUCCESS,
  COMPROBANTE_PROVIDER_MAKE_REQ,
  COMPROBANTE_PROVIDER_GETALL_SUCCESS,
  COMPROBANTE_PROVIDER_GETBY_SUCCESS,
  COMPROBANTE_PROVIDER_UPDATE_SUCCESS,
  COMPROBANTE_PROVIDER_REMOVE_SUCCESS,
  COMPROBANTE_PROVIDER_GET_FAIL,
  COMPROBANTE_PROVIDER_CREATE_FAIL,
  COMPROBANTE_PROVIDER_UPDATE_FAIL,
} from "src/middleware/types/ComprobanteProviderActionTypes";
import { ComprobanteProvider } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestComprobante = () => {
  return {
    type: COMPROBANTE_PROVIDER_MAKE_REQ,
  };
};

export const createComprobanteSuccess = (data: ComprobanteProvider) => {
  return {
    type: COMPROBANTE_PROVIDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const createComprobanteFail = (data: any) => {
  return {
    type: COMPROBANTE_PROVIDER_CREATE_FAIL,
    payload: data,
  };
};

export const getAllComprobantesSuccess = (data: ComprobanteProvider[]) => {
  return {
    type: COMPROBANTE_PROVIDER_GETALL_SUCCESS,
    payload: data,
  };
};

export const getComprobanteByIdSuccess = (data: ComprobanteProvider) => {
  return {
    type: COMPROBANTE_PROVIDER_GETBY_SUCCESS,
    payload: data,
  };
};

export const updateComprobanteSuccess = (data: ComprobanteProvider) => {
  return {
    type: COMPROBANTE_PROVIDER_UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateComprobanteFail = (data: any) => {
  return {
    type: COMPROBANTE_PROVIDER_UPDATE_FAIL,
    payload: data,
  };
};

export const removeComprobanteSuccess = (data: ComprobanteProvider) => {
  return {
    type: COMPROBANTE_PROVIDER_REMOVE_SUCCESS,
    payload: data,
  };
};

export const getComprobanteFail = (data: any) => {
  return {
    type: COMPROBANTE_PROVIDER_GET_FAIL,
    payload: data,
  };
};
