import {
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_MAKE_REQ,
  ACCOUNT_GETBYCLIENT_SUCCESS,
  ACCOUNT_GETCLIENTS_SUCCESS,
  ACCOUNT_GET_FAIL,
  ACCOUNT_GETBALANCES_CLIENTS_SUCCESS,
  ACCOUNT_REMOVE_SUCCESS,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
} from "@types/AccountActionTypes";
import { Account, Accounts, Balance } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestAccount = () => {
  return {
    type: ACCOUNT_MAKE_REQ,
  };
};

export const createRequestSuccess = (data: Account) => {
  return {
    type: ACCOUNT_CREATE_SUCCESS,
    payload: data,
  };
};

export const getRequestByClientSuccess = (data: Account[]) => {
  return {
    type: ACCOUNT_GETBYCLIENT_SUCCESS,
    payload: data,
  };
};

export const getClientsSuccess = (data: Accounts[]) => {
  return {
    type: ACCOUNT_GETCLIENTS_SUCCESS,
    payload: data,
  };
};

export const getBalancesClientsSuccess = (data: Balance[]) => {
  return {
    type: ACCOUNT_GETBALANCES_CLIENTS_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: ACCOUNT_GET_FAIL,
    payload: data,
  };
};

export const removeRequestSuccess = (data: Account) => {
  return {
    type: ACCOUNT_REMOVE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Account) => {
  return {
    type: ACCOUNT_UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestFail = (data: any) => {
  return {
    type: ACCOUNT_UPDATE_FAIL,
    payload: data,
  };
};
