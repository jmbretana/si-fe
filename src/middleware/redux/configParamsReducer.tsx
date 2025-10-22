import {
  CONFIG_MAKE_REQ,
  CONFIG_GETALL_SUCCESS,
  CONFIG_GETALL_FAIL,
  CONFIG_UPDATE_SUCCESS,
} from "src/middleware/types/ConfigParamsActionTypes";
import { Action, ConfigParams } from "@interfaces";

interface ConfigsState {
  configParams: ConfigParams | undefined;
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ConfigsState = {
  configParams: undefined,
  status: CONFIG_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const ConfigParamsReducer = (
  state = initialState,
  action: Action
): ConfigsState => {
  switch (action.type) {
    case CONFIG_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Inicia una solicitud
      };

    case CONFIG_GETALL_SUCCESS:
      return {
        ...state,
        status: CONFIG_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        configParams: action.payload as ConfigParams, // Actualiza la lista de products
      };

    case CONFIG_GETALL_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        configParams: undefined, // Restablece la lista de products
      };

    case CONFIG_UPDATE_SUCCESS:
      return {
        ...state,
        status: CONFIG_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        configParams: action.payload as ConfigParams, // Actualiza la lista de products
      };

    default:
      return state;
  }
};
