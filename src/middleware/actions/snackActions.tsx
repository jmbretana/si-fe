import { snackFail, snackSuccess, makeRequest } from "./types/snackActionType";

export const getInitialSnack = () => {
  return async (dispatch: any) => {
    dispatch(makeRequest());
  };
};

export const getSnackSuccess = (message: string) => {
  return async (dispatch: any) => {
    const snack = message;
    dispatch(snackSuccess(snack));
  };
};

export const getSnackError = (message: string) => {
  return async (dispatch: any) => {
    const snack = message;
    dispatch(snackFail(snack));
  };
};
