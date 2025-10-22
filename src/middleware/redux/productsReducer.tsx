import {
  PRODUCT_MAKE_REQ,
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_GETALL_COUNT_SUCCESS,
  PRODUCT_GETALL_FAIL,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";
import { Action, Product } from "@interfaces";

interface ProductsState {
  product: Product | undefined;
  products: Product[];
  count: number;
  status: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProductsState = {
  product: undefined,
  products: [],
  count: 0,
  status: PRODUCT_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const ProductReducer = (
  state = initialState,
  action: Action
): ProductsState => {
  switch (action.type) {
    case PRODUCT_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Inicia una solicitud
      };

    case PRODUCT_GETALL_SUCCESS:
      return {
        ...state,
        status: PRODUCT_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        products: action.payload as Product[], // Actualiza la lista de products
      };

    case PRODUCT_GETALL_COUNT_SUCCESS:
      return {
        ...state,
        status: PRODUCT_GETALL_COUNT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        count: action.payload as unknown as number, // Actualiza la lista de clients
      };

    case PRODUCT_GETALL_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        products: [], // Restablece la lista de products
      };

    case PRODUCT_GET_SUCCESS:
      return {
        ...state,
        status: PRODUCT_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload as Product, // Actualiza la lista de products
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        status: PRODUCT_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload as Product, // Actualiza la lista de products
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        status: PRODUCT_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload as Product, // Actualiza la lista de products
      };

    case PRODUCT_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        product: undefined, // Restablece la lista de products
      };
    default:
      return state;
  }
};
