import {
  CONFIG_MAKE_REQ,
  CONFIG_GETALL_SUCCESS,
  CONFIG_GETALL_FAIL,
  CONFIG_GET_FAIL,
  CONFIG_UPDATE_SUCCESS,
} from "src/middleware/types/ConfigParamsActionTypes";
import { ConfigParams } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequest = () => {
  return {
    type: CONFIG_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAll = (data: ConfigParams) => {
  return {
    type: CONFIG_GETALL_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: ConfigParams) => {
  return {
    type: CONFIG_UPDATE_SUCCESS,
    payload: data,
  };
};

export const getAllFail = (data: []) => {
  return {
    type: CONFIG_GETALL_FAIL,
    payload: data,
  };
};

export const getRequestFail = (data: []) => {
  return {
    type: CONFIG_GET_FAIL,
    payload: data,
  };
};
