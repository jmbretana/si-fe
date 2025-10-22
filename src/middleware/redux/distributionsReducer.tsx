import {
  DISTRIBUTION_MAKE_REQ,
  DISTRIBUTION_GETALL_SUCCESS,
  DISTRIBUTION_GETALLCOMPLETE_SUCCESS,
  DISTRIBUTION_GETALL_FAIL,
  DISTRIBUTION_CREATE_SUCCESS,
  DISTRIBUTION_REMOVE_SUCCESS,
} from "src/middleware/types/DistributionActionTypes";
import { Action, Distribution } from "@interfaces";

interface DistributionsState {
  distribution: Distribution | undefined;
  distributions: Distribution[];
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: DistributionsState = {
  distribution: undefined,
  distributions: [],
  status: DISTRIBUTION_MAKE_REQ,
  error: null,
  isLoading: false,
};

export const DistributionReducer = (
  state = initialState,
  action: Action
): DistributionsState => {
  switch (action.type) {
    case DISTRIBUTION_MAKE_REQ:
      return {
        ...state,
        status: DISTRIBUTION_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };
    case DISTRIBUTION_GETALL_SUCCESS:
      return {
        ...state,
        status: DISTRIBUTION_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        distributions: action.payload as Distribution[], // Actualiza la lista de budgets
      };

    case DISTRIBUTION_GETALLCOMPLETE_SUCCESS:
      return {
        ...state,
        status: DISTRIBUTION_GETALLCOMPLETE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        distributions: action.payload as Distribution[], // Actualiza la lista de budgets
      };

    case DISTRIBUTION_CREATE_SUCCESS:
      return {
        ...state,
        status: DISTRIBUTION_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
      };

    case DISTRIBUTION_REMOVE_SUCCESS:
      return {
        ...state,
        status: DISTRIBUTION_REMOVE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
      };

    case DISTRIBUTION_GETALL_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        distributions: [], // Restablece la lista de budgets
      };
    default:
      return state;
  }
};
