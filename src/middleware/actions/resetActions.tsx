import axios from 'axios';
import {
  makeRequestReset,
  getSuccess,
  getRequestFail,
} from '@actions/types/resetActionType';
import { API_URL_SERVER } from '@utils/constants';

const apiURLReset = API_URL_SERVER + '/reset';

export const getInitialReset = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestReset());
  };
};

export const makeReset = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getInitialReset());
      const res = await axios.post(`${apiURLReset}`);
      dispatch(getSuccess(res.data.data));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};
