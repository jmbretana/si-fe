import axios from "axios";

import {
  loginUserSuccess,
  loginUserFail,
  logoutUserSuccess,
  makeRequestUserAction,
} from "@actions/types/usersActionType";
import { User } from "@interfaces";
import {
  getSnackSuccess,
  getSnackError,
  getInitialSnack,
} from "./snackActions";
import { API_URL_SERVER } from "@utils/constants";

const apiURLUserLogin = API_URL_SERVER + "/auth/login/";

export const makeRequestUser = () => {
  return (dispatch: any) => {
    dispatch(makeRequestUserAction());
  };
};

export const getUserLogin = (user: User) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestUser());

      const res = await axios.post(apiURLUserLogin, {
        username: user.username,
        password: user.password,
      });
      const _list: User = res.data.data;
      if (_list && Object.keys(_list).length > 0) {
        dispatch(getSnackSuccess("Acceso correcto :)"));
        dispatch(getInitialSnack());
        dispatch(loginUserSuccess(_list));
      } else {
        throw new Error("Error de usuario/contraseña.");
      }
    } catch (err: any) {
      dispatch(getSnackError("Error de usuario/contraseña."));
      dispatch(loginUserFail(err.message));
    }
  };
};

export const getUserLogout = () => {
  return async (dispatch: any) => {
    dispatch(logoutUserSuccess());
  };
};
