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
import { Budget, BudgetsPagination } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestBudget = () => {
  return {
    type: BUDGET_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Budget[]) => {
  return {
    type: BUDGET_GETALL_SUCCESS,
    payload: data,
  };
};

export const getAllPaginationRequestSuccess = (data: BudgetsPagination) => {
  return {
    type: BUDGET_GETALL_PAGINATION_SUCCESS,
    payload: data,
  };
};

export const getAllCountRequestSuccess = (data: number) => {
  return {
    type: BUDGET_GETALL_COUNT_SUCCESS,
    payload: data as number,
  };
};

export const getAllByDaySuccess = (data: Budget[]) => {
  return {
    type: BUDGET_GET_BY_DAY_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Budget) => {
  return {
    type: BUDGET_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Budget) => {
  return {
    type: BUDGET_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Budget) => {
  return {
    type: BUDGET_UPDATE_SUCCESS,
    payload: data,
  };
};

export const getAllRequestFail = (data: any) => {
  return {
    type: BUDGET_GETALL_FAIL,
    payload: data,
  };
};

export const getRequestFail = (data: any) => {
  return {
    type: BUDGET_GET_FAIL,
    payload: data,
  };
};

export const removeRequestSuccess = (data: any) => {
  return {
    type: BUDGET_REMOVE_SUCCESS,
    payload: data,
  };
};
