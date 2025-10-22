import {
  ACCOUNT_PROVIDER_CREATE_SUCCESS,
  ACCOUNT_PROVIDER_MAKE_REQ,
  ACCOUNT_PROVIDER_GETBY_SUCCESS,
  ACCOUNT_PROVIDER_GETCLIENTS_SUCCESS,
  ACCOUNT_PROVIDER_GET_FAIL,
  ACCOUNT_PROVIDER_REMOVE_SUCCESS,
  ACCOUNT_PROVIDER_UPDATE_SUCCESS,
  ACCOUNT_PROVIDER_UPDATE_FAIL,
} from "@AccountProviderActionTypes";
import { AccountProvider } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestAccount = () => {
  return {
    type: ACCOUNT_PROVIDER_MAKE_REQ,
  };
};

export const createRequestSuccess = (data: AccountProvider) => {
  return {
    type: ACCOUNT_PROVIDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const getRequestByProviderSuccess = (data: AccountProvider[]) => {
  return {
    type: ACCOUNT_PROVIDER_GETBY_SUCCESS,
    payload: data,
  };
};

export const getProvidersSuccess = (data: AccountProvider[]) => {
  return {
    type: ACCOUNT_PROVIDER_GETCLIENTS_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: ACCOUNT_PROVIDER_GET_FAIL,
    payload: data,
  };
};

export const removeRequestSuccess = (data: AccountProvider) => {
  return {
    type: ACCOUNT_PROVIDER_REMOVE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: AccountProvider) => {
  return {
    type: ACCOUNT_PROVIDER_UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestFail = (data: any) => {
  return {
    type: ACCOUNT_PROVIDER_UPDATE_FAIL,
    payload: data,
  };
};
