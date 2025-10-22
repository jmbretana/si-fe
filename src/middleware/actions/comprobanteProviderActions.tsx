import axios from "axios";
import {
  makeRequestComprobante,
  createComprobanteSuccess,
  createComprobanteFail,
  getAllComprobantesSuccess,
  getComprobanteByIdSuccess,
  updateComprobanteSuccess,
  updateComprobanteFail,
  removeComprobanteSuccess,
  getComprobanteFail,
} from "@actions/types/comprobanteProviderActionType";
import { ComprobanteProvider } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { API_URL_SERVER } from "@utils/constants";

const apiURLComprobantes = API_URL_SERVER + "/comprobantes-providers/";

export const getInitialComprobante = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestComprobante());
  };
};

export const CreateComprobanteProvider = (
  newComprobante: ComprobanteProvider
) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());
      const res = await axios.post(apiURLComprobantes, newComprobante);
      const _comprobante: ComprobanteProvider = res.data.data;

      dispatch(getSnackSuccess("Comprobante creado correctamente !"));
      dispatch(createComprobanteSuccess(_comprobante));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear comprobante."));
      dispatch(createComprobanteFail(err.message));
    }
  };
};

export const GetAllComprobantesByProvider = (providerId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());
      const res = await axios.get(
        `${apiURLComprobantes}provider/${providerId}`
      );

      const _list: ComprobanteProvider[] = res.data.data;
      dispatch(getAllComprobantesSuccess(_list));
    } catch (err: any) {
      dispatch(getComprobanteFail(err.message));
    }
  };
};

export const GetComprobanteById = (comprobanteId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());
      const res = await axios.get(`${apiURLComprobantes}${comprobanteId}`);

      const _comprobante: ComprobanteProvider = res.data.data;
      dispatch(getComprobanteByIdSuccess(_comprobante));
    } catch (err: any) {
      dispatch(getComprobanteFail(err.message));
    }
  };
};

export const UpdateComprobanteProvider = (comprobante: ComprobanteProvider) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());

      const url = apiURLComprobantes + comprobante.comprobante_id;
      const res = await axios.put(url, comprobante);
      const _comprobante: ComprobanteProvider = res.data.data;

      dispatch(getSnackSuccess("Comprobante actualizado correctamente !"));
      dispatch(updateComprobanteSuccess(_comprobante));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar comprobante."));
      dispatch(updateComprobanteFail(err.message));
    }
  };
};

export const RemoveComprobanteProvider = (comprobanteId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());

      const url = apiURLComprobantes + comprobanteId;
      const res = await axios.delete(url);
      const _comprobante: ComprobanteProvider = res.data.data;

      dispatch(getSnackSuccess("Comprobante eliminado correctamente !"));
      dispatch(removeComprobanteSuccess(_comprobante));
    } catch (err: any) {
      dispatch(getSnackError("Error al eliminar comprobante."));
      dispatch(getComprobanteFail(err.message));
    }
  };
};

export const GetComprobantesByStatus = (providerId: string, status: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());
      const res = await axios.get(
        `${apiURLComprobantes}provider/${providerId}/status/${status}`
      );

      const _list: ComprobanteProvider[] = res.data.data;
      dispatch(getAllComprobantesSuccess(_list));
    } catch (err: any) {
      dispatch(getComprobanteFail(err.message));
    }
  };
};

export const GetComprobantesByDateRange = (
  providerId: string,
  fechaInicio: string,
  fechaFin: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestComprobante());
      const res = await axios.get(
        `${apiURLComprobantes}provider/${providerId}/date-range`,
        {
          params: { fechaInicio, fechaFin },
        }
      );

      const _list: ComprobanteProvider[] = res.data.data;
      dispatch(getAllComprobantesSuccess(_list));
    } catch (err: any) {
      dispatch(getComprobanteFail(err.message));
    }
  };
};
