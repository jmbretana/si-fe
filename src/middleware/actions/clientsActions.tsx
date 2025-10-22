import axios from "axios";

import {
  makeRequestClient,
  getAllRequestFail,
  getAllRequestSuccess,
  getAllCountRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  updateRequestSuccess,
  removeRequestSuccess,
} from "@actions/types/clientsActionType";
import { Client } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURLClients = API_URL_SERVER + "/clients/";
const apiURLClientsFilter = API_URL_SERVER + "/clients/filter";
const apiURLClientsCount = API_URL_SERVER + "/clients/filterCount";

const MAX_RETRIES = 5; // Set the maximum number of retries
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GetAllClients = (retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLClients);
      const _list: Client[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetAllClients(retryCount + 1)); // Reintentar la obtención de clientes
      } else {
        dispatch(getAllRequestFail(err.message));
      }
    }
  };
};

export const GetAllClientsFiltered = (params: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLClientsFilter, { params });
      const _list: Client[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllClientsCount = (params?: any) => {
  return async (dispatch: any) => {
    try {
      let res;

      if (params) {
        res = await axios.get(apiURLClientsCount, { params });
      } else {
        res = await axios.get(apiURLClientsCount, { params });
      }

      const _list: number = res.data.data;
      dispatch(getAllCountRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetClient = (id: string, retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestClient());

      const res = await axios.get(`${apiURLClients}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Client = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetClient(id, retryCount + 1)); // Reintentar la obtención de clientes
      } else {
        dispatch(getRequestFail(err.message));
      }
    }
  };
};

export const CreateClient = (newClient: Client) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(apiURLClients, newClient);
      const _list: Client = res.data.data;
      dispatch(getSnackSuccess("Cliente generado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear cliente."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateClient = (newClient: Client) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());

      const url = apiURLClients + newClient.client_id;
      const res = await axios.put(url, newClient);
      const _list: Client = res.data.data;
      dispatch(getSnackSuccess("Cliente actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar cliente."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const RemoveClient = (newClient: Client) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());

      const url = apiURLClients + newClient.client_id;
      const res = await axios.delete(url);
      const _list: Client = res.data.data;
      dispatch(getSnackSuccess("Cliente dado de baja correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al dar de baja cliente."));
      dispatch(getRequestFail(err.message));
    }
  };
};
