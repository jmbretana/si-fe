import axios from "axios";
import {
  makeRequestDistribution,
  createRequestSuccess,
  createRequestFail,
  getAllRequestFail,
  getAllRequestSuccess,
  getAllByDaySuccess,
  removeRequestSuccess,
} from "@actions/types/distributionsActionType";
import { Distribution } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { API_URL_SERVER } from "@utils/constants";

const apiURLDistributions = API_URL_SERVER + "/distributions/";
const apiURLDistributionsComplete =
  API_URL_SERVER + "/distributions/getComplete/";

export const createDistribution = (newDistribution: Distribution) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestDistribution());

      const res = await axios.post(apiURLDistributions, newDistribution);
      const _list: Distribution = res.data.data;

      dispatch(getSnackSuccess("Distribucion creada correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear distribucion."));
      dispatch(createRequestFail(err.message));
    }
  };
};

export const GetAllDistribution = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLDistributions);
      const _list: Distribution[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllByDayDistributions = (params?: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestDistribution());
      const res = await axios.get(apiURLDistributionsComplete, { params });

      const _list: Distribution[] = res.data.data;

      dispatch(getAllByDaySuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const RemoveDistribution = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestDistribution());

      const url = apiURLDistributions + id;
      const res = await axios.delete(url);
      const _list: Distribution = res.data.data;
      dispatch(getSnackSuccess("Distribucion eliminada correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al eliminar distribucion."));
      dispatch(getAllRequestFail(err.message));
    }
  };
};
