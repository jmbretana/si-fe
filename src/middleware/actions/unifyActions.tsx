import axios from 'axios';
import {
  makeRequestUnify,
  getSuccess,
  getRequestFail,
} from '@actions/types/unifyActionType';
import { API_URL_SERVER } from '@utils/constants';
import { Unify } from '@interfaces';

const apiURLUnify = API_URL_SERVER + '/unify-data';

export const getInitialReset = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestUnify());
  };
};

export const getUnify = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getInitialReset());
      const res = await axios.get(`${apiURLUnify}`);
      dispatch(getSuccess(res.data.data));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const updateUnify = (data: Unify) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestUnify());
      const res = await axios.put(`${apiURLUnify}`, data);
      dispatch(getSuccess(res.data.data));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};
