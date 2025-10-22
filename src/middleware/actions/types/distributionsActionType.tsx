import {
  DISTRIBUTION_MAKE_REQ,
  DISTRIBUTION_GETALL_SUCCESS,
  DISTRIBUTION_GETALLCOMPLETE_SUCCESS,
  DISTRIBUTION_GETALL_FAIL,
  DISTRIBUTION_GET_SUCCESS,
  DISTRIBUTION_GET_FAIL,
  DISTRIBUTION_CREATE_SUCCESS,
  DISTRIBUTION_CREATE_FAIL,
  DISTRIBUTION_UPDATE_SUCCESS,
  DISTRIBUTION_REMOVE_SUCCESS,
} from "src/middleware/types/DistributionActionTypes";
import { Distribution } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestDistribution = () => {
  return {
    type: DISTRIBUTION_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Distribution[]) => {
  return {
    type: DISTRIBUTION_GETALL_SUCCESS,
    payload: data,
  };
};

export const getAllByDaySuccess = (data: Distribution[]) => {
  return {
    type: DISTRIBUTION_GETALLCOMPLETE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Distribution) => {
  return {
    type: DISTRIBUTION_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Distribution) => {
  return {
    type: DISTRIBUTION_CREATE_SUCCESS,
    payload: data,
  };
};

export const createRequestFail = (data: Distribution) => {
  return {
    type: DISTRIBUTION_CREATE_FAIL,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Distribution) => {
  return {
    type: DISTRIBUTION_UPDATE_SUCCESS,
    payload: data,
  };
};

export const getAllRequestFail = (data: any) => {
  return {
    type: DISTRIBUTION_GETALL_FAIL,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: DISTRIBUTION_GET_FAIL,
    payload: data,
  };
};

export const removeRequestSuccess = (data: any) => {
  return {
    type: DISTRIBUTION_REMOVE_SUCCESS,
    payload: data,
  };
};
