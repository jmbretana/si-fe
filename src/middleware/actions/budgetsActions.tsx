import axios from "axios";
import {
  makeRequestBudget,
  getAllRequestFail,
  getAllRequestSuccess,
  getAllPaginationRequestSuccess,
  getAllCountRequestSuccess,
  getAllByDaySuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  removeRequestSuccess,
  updateRequestSuccess,
} from "@actions/types/budgetsActionType";
import { Budget, BudgetsPagination, NavigationBudget } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { API_URL_SERVER } from "@utils/constants";

const apiURLBudgets = API_URL_SERVER + "/budgets/";
const apiURLBudgetsByClient = API_URL_SERVER + "/budgets/getByClient/";
const apiURLBudgetsCount = API_URL_SERVER + "/budgets/filterCount";
const apiURLBudgetsByDay = API_URL_SERVER + "/budgets/getByDay";
const apiURLBudgetsPaginated = API_URL_SERVER + "/budgets/paginated";

const MAX_RETRIES = 5; // Set the maximum number of retries
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getInitialBudget = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestBudget());
  };
};

export const GetAllBudgets = (retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBudget());

      const res = await axios.get(apiURLBudgets);
      const _list: Budget[] = res.data.data;

      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetAllBudgets(retryCount + 1)); // Reintentar la obtención de clientes
      } else {
        dispatch(getAllRequestFail(err.message));
      }
    }
  };
};

export const GetAllBudgetsPage = (filter: NavigationBudget) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBudget());
      const res = await axios.get(apiURLBudgetsPaginated, {
        params: filter,
      });

      const _list: BudgetsPagination = res.data.data;

      dispatch(getAllPaginationRequestSuccess(_list));
    } catch (err: any) {
      console.error(err);
    }
  };
};

export const GetAllCount = (params?: any) => {
  return async (dispatch: any) => {
    try {
      let res;

      if (params) {
        res = await axios.get(apiURLBudgetsCount, { params });
      } else {
        res = await axios.get(apiURLBudgetsCount, { params });
      }

      const _list: number = res.data.data;
      dispatch(getAllCountRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllByDayBudgets = (params?: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLBudgetsByDay, { params });
      const _list: Budget[] = res.data.data;
      dispatch(getAllByDaySuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllClientBudgets = (clientId: string, retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLBudgetsByClient}${clientId}`);

      const _list: Budget[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetAllClientBudgets(clientId, retryCount + 1)); // Reintentar la obtención de clientes
      } else {
        dispatch(getAllRequestFail(err.message));
      }
    }
  };
};

export const GetBudget = (id: string, retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLBudgets}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Budget = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetBudget(id, retryCount + 1)); // Reintentar la obtención de clientes
      } else {
        dispatch(getRequestFail(err.message));
      }
    }
  };
};

export const CreateBudget = (newBudget: Budget) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBudget());

      const res = await axios.post(apiURLBudgets, newBudget);
      const _list: Budget = res.data.data;

      dispatch(getSnackSuccess("Presupuesto creado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear presupuesto."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateBudget = (newBudget: Budget) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBudget());

      const url = apiURLBudgets + newBudget.budget_id;
      const res = await axios.put(url, newBudget);
      const _list: Budget = res.data.data;

      dispatch(getSnackSuccess("Presupuesto actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar presupuesto."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const RemoveBudget = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBudget());

      const url = apiURLBudgets + id;
      const res = await axios.delete(url);
      const _list: Budget = res.data.data;
      dispatch(getSnackSuccess("Presupuesto dado de baja correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al dar de baja el presupuesto."));
      dispatch(getRequestFail(err.message));
    }
  };
};
