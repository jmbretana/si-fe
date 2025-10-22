import axios from "axios";
import {
  getAllRequestSuccess,
  getAllRequestFail,
  makeRequest,
  getRequestSuccess,
  createRequestSuccess,
  createRequestFail,
  updateRequestSuccess,
} from "@actions/types/providersActionType";
import { Provider } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { API_URL_SERVER } from "@utils/constants";

const apiURLProviders = API_URL_SERVER + "/providers/";

export const GetProviders = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProviders);
      const _list: Provider[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetProvider = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());

      const res = await axios.get(`${apiURLProviders}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Provider = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      console.error(err);
    }
  };
};

export const CreateProvider = (newProvider: Provider) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(apiURLProviders, newProvider);
      const _list: Provider = res.data.data;
      dispatch(getSnackSuccess("Proveedor generado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear proveedor."));
      dispatch(createRequestFail(err.message));
    }
  };
};

export const UpdateProvider = (newProvider: Provider) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());

      const url = apiURLProviders + newProvider._id;
      const res = await axios.put(url, newProvider);
      const _list: Provider = res.data.data;
      dispatch(getSnackSuccess("Proveedor actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar proveedor."));
      dispatch(createRequestFail(err.message));
    }
  };
};
