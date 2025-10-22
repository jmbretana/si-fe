import {
  CREDIT_NOTE_CREATE_SUCCESS,
  CREDIT_NOTE_MAKE_REQ,
  CREDIT_NOTE_GETBYCLIENT_SUCCESS,
  CREDIT_NOTE_GETCLIENTS_SUCCESS,
  CREDIT_NOTE_GET_FAIL,
} from "@CreditNoteActionTypes";
import { Action, CreditNote } from "@interfaces";

interface CreditNotesState {
  creditNote: CreditNote | undefined;
  creditNotes: CreditNote[];
  statusNote: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: CreditNotesState = {
  creditNote: undefined,
  creditNotes: [],
  statusNote: CREDIT_NOTE_MAKE_REQ,
  error: null,
  isLoading: false,
};

export const CreditNoteReducer = (
  state = initialState,
  action: Action
): CreditNotesState => {
  switch (action.type) {
    case CREDIT_NOTE_MAKE_REQ:
      return {
        ...state,
        statusNote: CREDIT_NOTE_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };
    case CREDIT_NOTE_GETBYCLIENT_SUCCESS:
      return {
        ...state,
        statusNote: CREDIT_NOTE_GETBYCLIENT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        creditNotes: action.payload as CreditNote[],
      };
    case CREDIT_NOTE_GETCLIENTS_SUCCESS:
      return {
        ...state,
        statusNote: CREDIT_NOTE_GETCLIENTS_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
      };
    case CREDIT_NOTE_CREATE_SUCCESS:
      return {
        ...state,
        statusNote: CREDIT_NOTE_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        creditNote: action.payload as CreditNote,
      };
    case CREDIT_NOTE_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        creditNotes: [],
      };
    default:
      return state;
  }
};
