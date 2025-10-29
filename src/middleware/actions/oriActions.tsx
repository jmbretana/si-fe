import axios from 'axios';
import {
  makeRequestOri,
  getSuccess,
  getRequestFail,
} from '@actions/types/oriActionType';
import { controlDataOri } from '@interfaces';
import { getSnackSuccess, getSnackError } from '@actions/snackActions';
import { makeRequest } from '@actions/types/snackActionType';
import { API_URL_SERVER } from '@utils/constants';

const apiURLOri = API_URL_SERVER + '/ori/';

export const getInitialOri = () => {
  return async (dispatch: any) => {
    dispatch(makeRequestOri());
  };
};

export const GetOri = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLOri}`);

      const _list: controlDataOri = res.data.data;
      dispatch(getSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};
