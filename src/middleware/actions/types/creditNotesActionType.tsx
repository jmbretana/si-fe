import {
  CREDIT_NOTE_CREATE_SUCCESS,
  CREDIT_NOTE_MAKE_REQ,
  CREDIT_NOTE_GETBYCLIENT_SUCCESS,
  CREDIT_NOTE_GETCLIENTS_SUCCESS,
  CREDIT_NOTE_GET_FAIL,
} from "@CreditNoteActionTypes";
import { CreditNote } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestCreditNote = () => {
  return {
    type: CREDIT_NOTE_MAKE_REQ,
  };
};

export const createRequestSuccess = (data: CreditNote) => {
  return {
    type: CREDIT_NOTE_CREATE_SUCCESS,
    payload: data,
  };
};

export const getRequestByClientSuccess = (data: CreditNote[]) => {
  return {
    type: CREDIT_NOTE_GETBYCLIENT_SUCCESS,
    payload: data,
  };
};

export const getClientsSuccess = (data: CreditNote[]) => {
  return {
    type: CREDIT_NOTE_GETCLIENTS_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: CREDIT_NOTE_GET_FAIL,
    payload: data,
  };
};
