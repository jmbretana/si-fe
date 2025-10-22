import {
  PROVIDER_GETS_SUCCESS,
  PROVIDER_GET_FAIL,
  PROVIDER_MAKE_REQ,
  PROVIDER_GET_SUCCESS,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_CREATE_FAIL,
  PROVIDER_UPDATE_SUCCESS,
} from "src/middleware/types/ProviderActionTypes";
import { Action, Provider } from "@interfaces";

interface ProvidersState {
  provider: Provider | undefined;
  providers: Provider[];
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProvidersState = {
  provider: undefined,
  providers: [],
  status: PROVIDER_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const ProviderReducer = (
  state = initialState,
  action: Action
): ProvidersState => {
  switch (action.type) {
    case PROVIDER_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Inicia una solicitud
      };

    case PROVIDER_GETS_SUCCESS:
      return {
        ...state,
        status: PROVIDER_GETS_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        providers: action.payload as Provider[], // Actualiza la lista de products
      };

    case PROVIDER_GET_SUCCESS:
      return {
        ...state,
        status: PROVIDER_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        provider: action.payload as Provider, // Actualiza el product seleccionado
      };

    case PROVIDER_CREATE_SUCCESS:
      return {
        ...state,
        status: PROVIDER_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        provider: action.payload as Provider, // Actualiza el product seleccionado
      };

    case PROVIDER_CREATE_FAIL:
      return {
        ...state,
        status: PROVIDER_CREATE_FAIL,
        isLoading: false, // Finaliza la solicitud con éxito
        provider: action.payload as Provider, // Actualiza el product seleccionado
      };

    case PROVIDER_UPDATE_SUCCESS:
      return {
        ...state,
        status: PROVIDER_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        provider: action.payload as Provider, // Actualiza el product seleccionado
      };

    case PROVIDER_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        status: PROVIDER_GET_FAIL, // Actualiza el estado
      };

    default:
      return state;
  }
};
