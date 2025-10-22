import axios from "axios";
import {
  makeRequest as makeRequestProduct,
  getAllRequestFail,
  getAllRequestSuccess,
  getAllCountRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  updateRequestSuccess,
} from "@actions/types/productsActionType";
import { Product } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { makeRequest } from "@actions/types/snackActionType";
import { API_URL_SERVER } from "@utils/constants";

const apiURLProducts = API_URL_SERVER + "/products/";
const apiURLProductsFilter = API_URL_SERVER + "/products/filter";
const apiURLProductsCount = API_URL_SERVER + "/products/filterCount";

const MAX_RETRIES = 5; // Set the maximum number of retries
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para obtener todos los productos
export const GetAllProducts = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProducts);
      const _list: Product[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllProductsFiltered = (paramsA: any, paramsB: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestProduct);

      let params = paramsA;
      const resA = await axios.get(apiURLProductsFilter, { params });
      const _listA: Product[] = resA.data.data;

      params = paramsB;
      const resV = await axios.get(apiURLProductsFilter, { params });
      const _listV: Product[] = resV.data.data;

      const list: Product[] = [];
      _listA.map((item) => list.push(item));
      _listV.map((item) => list.push(item));

      dispatch(getAllRequestSuccess(list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllCount = (params?: any) => {
  return async (dispatch: any) => {
    try {
      let res;

      if (params) {
        res = await axios.get(apiURLProductsCount, { params });
      } else {
        res = await axios.get(apiURLProductsCount, { params });
      }

      const _list: number = res.data.data;
      dispatch(getAllCountRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los productos
export const GetProduct = (id: string, retryCount = 0) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLProducts}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Product = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      if (retryCount < MAX_RETRIES) {
        await delay(1000); // Esperar 1 segundo
        dispatch(GetProduct(id, retryCount + 1)); // Reintentar la obtención de productes
      } else {
        dispatch(getRequestFail(err.message));
      }
    }
  };
};

export const CreateProduct = (newProduct: Product) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const res = await axios.post(apiURLProducts, newProduct);
      const _list: Product = res.data.data;
      dispatch(getSnackSuccess("Producto generado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear producto."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateProduct = (newProduct: Product) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequest());
      const url = apiURLProducts + newProduct.id;
      const res = await axios.put(url, newProduct);
      const _list: Product = res.data.data;
      dispatch(getSnackSuccess("Producto actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar producto."));
      dispatch(getRequestFail(err.message));
    }
  };
};
