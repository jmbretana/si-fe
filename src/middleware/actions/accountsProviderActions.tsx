import axios from "axios";
import {
  createRequestSuccess,
  makeRequestAccount,
  getRequestByProviderSuccess,
  getRequestFail,
  removeRequestSuccess,
  updateRequestSuccess,
  updateRequestFail,
} from "@actions/types/accountsProviderActionType";
import { AccountProvider } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURLAccounts = API_URL_SERVER + "/accounts-providers/";
const apiURLAccountsByProvider = apiURLAccounts + "balance/";

export const getInitialBudget = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestAccount());
  };
};

export const CreateAccountProvider = (newAccount: AccountProvider) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const res = await axios.post(apiURLAccounts, newAccount);
      const _list: AccountProvider = res.data.data;

      dispatch(getSnackSuccess("Movimiento creado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear movimiento."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetAllAccounts = (providerId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLAccountsByProvider}${providerId}`);

      const _list: AccountProvider[] = res.data.data;
      dispatch(getRequestByProviderSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetProviderBalance = (providerId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLAccountsByProvider}${providerId}`);

      const _list: AccountProvider[] = res.data.data;
      dispatch(getRequestByProviderSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const RemoveBalanceProvider = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAccount());

      const url = apiURLAccounts + id;
      const res = await axios.delete(url);
      const _list: AccountProvider = res.data.data;
      dispatch(getSnackSuccess("Movimiento dado de baja correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al dar de baja el movimiento."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateBalanceProvider = (account: AccountProvider) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAccount());

      const url = apiURLAccounts + account.asiento_id;
      const res = await axios.put(url, account);
      const _list: AccountProvider = res.data.data;

      dispatch(getSnackSuccess("Movimiento actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar movimiento."));
      dispatch(updateRequestFail(err.message));
    }
  };
};
