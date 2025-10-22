import axios from "axios";
import { getAll, getAllFail } from "@actions/types/configParamsActionType";
import { ConfigParams } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURL = API_URL_SERVER + "/configParams/";

// Función para obtener todos los productos
export const GetAllParams = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURL);
      const _list: ConfigParams = res.data.data;
      dispatch(getAll(_list));
    } catch (err: any) {
      dispatch(getAllFail(err.message));
    }
  };
};

export const UpdateConfig = (config: ConfigParams) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const url = apiURL;
      const res = await axios.put(url, config);
      const _list: ConfigParams = res.data.data;
      dispatch(getSnackSuccess("Configuracción actualizada correctamente !"));
      dispatch(getAll(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar la configuracion."));
      dispatch(getAllFail(err.message));
    }
  };
};
