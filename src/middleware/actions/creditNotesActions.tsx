import axios from "axios";
import {
  createRequestSuccess,
  makeRequestCreditNote,
  getRequestByClientSuccess,
  getClientsSuccess,
  getRequestFail,
} from "@actions/types/creditNotesActionType";
import { CreditNote } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURLCreditNotes = API_URL_SERVER + "/creditnote/";
const apiURLCreditNotesClients = apiURLCreditNotes + "getCreditNotesClients/";
const apiURLCreditNotesByClient = apiURLCreditNotes + "getByClient/";

export const getInitialCreditNote = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestCreditNote());
  };
};

export const createCreditNote = (newCreditNote: CreditNote) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const res = await axios.post(apiURLCreditNotes, newCreditNote);
      const _list: CreditNote = res.data.data;

      dispatch(getSnackSuccess("Movimiento creado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear movimiento."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const getAllClientCreditNotes = (clientId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLCreditNotesByClient}${clientId}`);

      const _list: CreditNote[] = res.data.data;
      dispatch(getRequestByClientSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetAllCreditNoteClients = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLCreditNotesClients}`);

      const _list: CreditNote[] = res.data.data;
      dispatch(getClientsSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};
