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
import { Action, Client } from "@interfaces";

interface ClientsState {
  client: Client | undefined;
  clients: Client[];
  count: number;
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ClientsState = {
  client: undefined,
  clients: [],
  count: 0,
  status: CLIENT_MAKE_REQ,
  error: null,
  isLoading: true,
};

// Reducer que maneja el estado de clients
export const ClientReducer = (
  state = initialState,
  action: Action
): ClientsState => {
  switch (action.type) {
    case CLIENT_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Inicia una solicitud
      };

    case CLIENT_GETALL_SUCCESS:
      return {
        ...state,
        status: CLIENT_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        clients: action.payload as Client[], // Actualiza la lista de clients
        client: undefined,
      };

    case CLIENT_GETALL_COUNT_SUCCESS:
      return {
        ...state,
        status: CLIENT_GETALL_COUNT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        count: action.payload as unknown as number, // Actualiza la lista de clients
      };

    case CLIENT_GETALL_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        clients: [], // Restablece la lista de clients
      };

    case CLIENT_GET_SUCCESS:
      return {
        ...state,
        status: CLIENT_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        client: action.payload as Client, // Actualiza la lista de clients
      };

    case CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        status: CLIENT_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        client: action.payload as Client, // Actualiza la lista de clients
      };

    case CLIENT_REMOVE_SUCCESS:
      return {
        ...state,
        status: CLIENT_REMOVE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        client: action.payload as Client, // Actualiza la lista de clients
      };

    case CLIENT_UPDATE_SUCCESS:
      return {
        ...state,
        status: CLIENT_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        client: action.payload as Client, // Actualiza la lista de clients
      };

    case CLIENT_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        client: undefined, // Restablece la lista de clients
      };
    default:
      return state;
  }
};
