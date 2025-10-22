import axios from "axios";
import {
  getRequestFail,
  getLocalitiesSuccess,
  getTownsSuccess,
  getProvinceSuccess,
} from "@actions/types/geoActionType";
import { Locality, Province } from "@interfaces";
import { API_URL_SERVER } from "@utils/constants";

const apiURLProvinces = API_URL_SERVER + "/geo/province/";
const apiURLLocalities = API_URL_SERVER + "/geo/locality/";
const apiURLTown = API_URL_SERVER + "/geo/province-town/";

export const GetLocalities = (province: string, town: string) => {
  const params = { provincia_nombre: province, municipio_nombre: town };
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLLocalities, { params });
      const _list: Locality[] = res.data.data;
      dispatch(getLocalitiesSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetTowns = (province: string) => {
  const params = { provincia_nombre: province };

  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLTown, { params });

      const _list: Locality[] = res.data.data;
      dispatch(getTownsSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetProvinces = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProvinces);
      const _list: Province[] = res.data.data;
      dispatch(getProvinceSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};
