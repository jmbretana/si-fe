import axios from "axios";
import {
  createRequestSuccess,
  makeRequestAccount,
  getRequestByClientSuccess,
  getClientsSuccess,
  getRequestFail,
  getBalancesClientsSuccess,
  removeRequestSuccess,
  updateRequestSuccess,
  updateRequestFail,
} from "@actions/types/accountsActionType";
import { Account, Accounts, Balance } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURLAccounts = API_URL_SERVER + "/accounts/";
const apiURLAccountsClients = apiURLAccounts + "getAccountsClients/";
const apiURLAccountsByClient = apiURLAccounts + "getByClient/";
const apiURLBalancesClients = apiURLAccounts + "getBalances/";

export const getInitialBudget = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestAccount());
  };
};

export const CreateAccount = (newAccount: Account) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const res = await axios.post(apiURLAccounts, newAccount);
      const _list: Account = res.data.data;

      dispatch(getSnackSuccess("Movimiento creado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear movimiento."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetAllClientAccounts = (clientId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLAccountsByClient}${clientId}`);

      const _list: Account[] = res.data.data;
      dispatch(getRequestByClientSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetClientBalance = (clientId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLAccountsByClient}${clientId}`);

      const _list: Account[] = res.data.data;
      dispatch(getRequestByClientSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetAllAccountClients = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLAccountsClients}`);

      const _list: Accounts[] = res.data.data;
      dispatch(getClientsSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetBalancesClients = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLBalancesClients}`);

      const _list: Balance[] = res.data.data;
      dispatch(getBalancesClientsSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const RemoveBalanceClient = (
  id: string,
  username: string | undefined
) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAccount());

      const account = {
        asiento_id: id,
        username: username,
      };

      const url = apiURLAccounts + id;
      const res = await axios.delete(url, { data: account });
      const _list: Account = res.data.data;
      dispatch(getSnackSuccess("Movimiento dado de baja correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al dar de baja el movimiento."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateBalanceClient = (account: Account) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAccount());

      const url = apiURLAccounts + account.asiento_id;
      const res = await axios.put(url, account);
      const _list: Account = res.data.data;

      dispatch(getSnackSuccess("Movimiento actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar movimiento."));
      dispatch(updateRequestFail(err.message));
    }
  };
};
