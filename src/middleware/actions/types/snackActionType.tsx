import {
  SNACK_MAKE_REQ,
  SNACK_SUCCESS,
  SNACK_FAIL,
} from "src/middleware/types/SnackActionTypes";

export const makeRequest = () => {
  return {
    type: SNACK_MAKE_REQ,
  };
};

export const snackSuccess = (data: string) => {
  return {
    type: SNACK_SUCCESS,
    payload: data,
  };
};

export const snackFail = (data: string) => {
  return {
    type: SNACK_FAIL,
    payload: data,
  };
};
