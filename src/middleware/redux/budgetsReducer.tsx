import {
  BUDGET_MAKE_REQ,
  BUDGET_GETALL_SUCCESS,
  BUDGET_GETALL_PAGINATION_SUCCESS,
  BUDGET_GETALL_COUNT_SUCCESS,
  BUDGET_GETALL_FAIL,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAIL,
  BUDGET_CREATE_SUCCESS,
  BUDGET_UPDATE_SUCCESS,
  BUDGET_REMOVE_SUCCESS,
  BUDGET_GET_BY_DAY_SUCCESS,
} from "src/middleware/types/BudgetActionTypes";
import { Action, Budget, BudgetCaja, BudgetsPagination } from "@interfaces";

interface BudgetsState {
  budget: Budget | undefined;
  budgets: Budget[];
  budgetsPagination: BudgetsPagination | undefined;
  budgetsCaja: BudgetCaja[];
  count: number;
  budgetStatus: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: BudgetsState = {
  budget: undefined,
  budgets: [],
  budgetsCaja: [],
  budgetsPagination: undefined,
  count: 0,
  budgetStatus: BUDGET_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de budgets
export const BudgetReducer = (
  state = initialState,
  action: Action
): BudgetsState => {
  switch (action.type) {
    case BUDGET_MAKE_REQ:
      return {
        ...state,
        budgetStatus: BUDGET_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };
    case BUDGET_GETALL_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budgets: action.payload as Budget[], // Actualiza la lista de budgets
      };

    case BUDGET_GETALL_PAGINATION_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_GETALL_PAGINATION_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budgetsPagination: action.payload as BudgetsPagination, // Actualiza la lista de budgets
      };

    case BUDGET_GETALL_COUNT_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_GETALL_COUNT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        count: action.payload as unknown as number, // Actualiza la lista de budgets
      };
    case BUDGET_GET_BY_DAY_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_GET_BY_DAY_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budgetsCaja: action.payload as BudgetCaja[], // Actualiza la lista de budgets
      };
    case BUDGET_GETALL_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        budgets: [], // Restablece la lista de budgets
      };
    case BUDGET_GET_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budget: action.payload as Budget, // Actualiza la lista de budgets
      };

    case BUDGET_CREATE_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budget: action.payload as Budget, // Actualiza la lista de budgets
      };

    case BUDGET_UPDATE_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budget: action.payload as Budget, // Actualiza la lista de budgets
      };

    case BUDGET_REMOVE_SUCCESS:
      return {
        ...state,
        budgetStatus: BUDGET_REMOVE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        budget: undefined, // Restablece la lista de budgets
      };
    case BUDGET_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        budget: undefined, // Restablece la lista de budgets
      };
    default:
      return state;
  }
};
