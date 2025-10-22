import {
  CLIENT_MAKE_REQ,
  CLIENT_GETALL_SUCCESS,
  CLIENT_GETALL_COUNT_SUCCESS,
  CLIENT_GETALL_FAIL,
  CLIENT_GET_SUCCESS,
  CLIENT_GET_FAIL,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_REMOVE_SUCCESS,
} from "src/middleware/types/ClientActionTypes";
import { Client } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestClient = () => {
  return {
    type: CLIENT_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Client[]) => {
  return {
    type: CLIENT_GETALL_SUCCESS,
    payload: data,
  };
};

export const getAllCountRequestSuccess = (data: number) => {
  return {
    type: CLIENT_GETALL_COUNT_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Client) => {
  return {
    type: CLIENT_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Client) => {
  return {
    type: CLIENT_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Client) => {
  return {
    type: CLIENT_UPDATE_SUCCESS,
    payload: data,
  };
};

export const removeRequestSuccess = (data: Client) => {
  return {
    type: CLIENT_REMOVE_SUCCESS,
    payload: data,
  };
};

export const getAllRequestFail = (data: any) => {
  return {
    type: CLIENT_GETALL_FAIL,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: CLIENT_GET_FAIL,
    payload: data,
  };
};
