import {
  PRODUCT_MAKE_REQ,
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_GETALL_FAIL,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GETALL_COUNT_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";
import { Product } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequest = () => {
  return {
    type: PRODUCT_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Product[]) => {
  return {
    type: PRODUCT_GETALL_SUCCESS,
    payload: data,
  };
};

export const getAllCountRequestSuccess = (data: number) => {
  return {
    type: PRODUCT_GETALL_COUNT_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_UPDATE_SUCCESS,
    payload: data,
  };
};

export const getAllRequestFail = (data: []) => {
  return {
    type: PRODUCT_GETALL_FAIL,
    payload: data,
  };
};

export const getRequestFail = (data: []) => {
  return {
    type: PRODUCT_GET_FAIL,
    payload: data,
  };
};
