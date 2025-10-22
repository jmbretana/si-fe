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
} from "../types/ComprobanteProviderActionTypes";
import { Action, ComprobanteProvider } from "@interfaces";

interface ComprobanteProviderState {
  comprobante: ComprobanteProvider | undefined;
  comprobantes: ComprobanteProvider[];
  statusComprobantes: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ComprobanteProviderState = {
  comprobante: undefined,
  comprobantes: [],
  statusComprobantes: COMPROBANTE_PROVIDER_MAKE_REQ,
  error: null,
  isLoading: false,
};

export const ComprobanteProviderReducer = (
  state = initialState,
  action: Action
): ComprobanteProviderState => {
  switch (action.type) {
    case COMPROBANTE_PROVIDER_MAKE_REQ:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null,
      };

    case COMPROBANTE_PROVIDER_CREATE_SUCCESS:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_CREATE_SUCCESS,
        isLoading: false,
        comprobante: action.payload as ComprobanteProvider,
        error: null,
      };

    case COMPROBANTE_PROVIDER_CREATE_FAIL:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_CREATE_FAIL,
        isLoading: false,
        error: "Error desconocido",
      };

    case COMPROBANTE_PROVIDER_GETALL_SUCCESS:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_GETALL_SUCCESS,
        isLoading: false,
        comprobantes: action.payload as ComprobanteProvider[],
        error: null,
      };

    case COMPROBANTE_PROVIDER_GETBY_SUCCESS:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_GETBY_SUCCESS,
        isLoading: false,
        comprobante: action.payload as ComprobanteProvider,
        error: null,
      };

    case COMPROBANTE_PROVIDER_UPDATE_SUCCESS:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_UPDATE_SUCCESS,
        isLoading: false,
        comprobante: action.payload as ComprobanteProvider,
        error: null,
      };

    case COMPROBANTE_PROVIDER_UPDATE_FAIL:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_UPDATE_FAIL,
        isLoading: false,
        error: "Error desconocido",
      };

    case COMPROBANTE_PROVIDER_REMOVE_SUCCESS:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_REMOVE_SUCCESS,
        isLoading: false,
        error: null,
      };

    case COMPROBANTE_PROVIDER_GET_FAIL:
      return {
        ...state,
        statusComprobantes: COMPROBANTE_PROVIDER_GET_FAIL,
        isLoading: false,
        error: "Error desconocido",
        comprobantes: [],
      };

    default:
      return state;
  }
};
