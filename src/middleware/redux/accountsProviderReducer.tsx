import {
  ACCOUNT_PROVIDER_CREATE_SUCCESS,
  ACCOUNT_PROVIDER_MAKE_REQ,
  ACCOUNT_PROVIDER_GETBY_SUCCESS,
  ACCOUNT_PROVIDER_GET_FAIL,
  ACCOUNT_PROVIDER_GETBALANCES_CLIENTS_SUCCESS,
  ACCOUNT_PROVIDER_REMOVE_SUCCESS,
  ACCOUNT_PROVIDER_UPDATE_SUCCESS,
  ACCOUNT_PROVIDER_UPDATE_FAIL,
} from "../types/AccountProviderActionTypes";
import { Action, AccountProvider, Balance } from "@interfaces";

interface AccountsProviderState {
  accountProvider: AccountProvider | undefined;
  accountsProvider: AccountProvider[];
  balances: Balance[];
  statusAccount: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: AccountsProviderState = {
  accountProvider: undefined,
  accountsProvider: [],
  balances: [],
  statusAccount: ACCOUNT_PROVIDER_MAKE_REQ,
  error: null,
  isLoading: false,
};

export const AccountProviderReducer = (
  state = initialState,
  action: Action
): AccountsProviderState => {
  switch (action.type) {
    case ACCOUNT_PROVIDER_MAKE_REQ:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };
    case ACCOUNT_PROVIDER_GETBY_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_GETBY_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        accountsProvider: action.payload as AccountProvider[],
      };

    case ACCOUNT_PROVIDER_GETBALANCES_CLIENTS_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_GETBALANCES_CLIENTS_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        balances: action.payload as Balance[],
      };

    case ACCOUNT_PROVIDER_CREATE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        accountProvider: action.payload as AccountProvider,
      };
    case ACCOUNT_PROVIDER_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        accountsProvider: [],
      };
    case ACCOUNT_PROVIDER_REMOVE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_REMOVE_SUCCESS,
        isLoading: false,
      };
    case ACCOUNT_PROVIDER_UPDATE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_UPDATE_SUCCESS,
        isLoading: false,
        accountProvider: action.payload as AccountProvider,
      };
    case ACCOUNT_PROVIDER_UPDATE_FAIL:
      return {
        ...state,
        statusAccount: ACCOUNT_PROVIDER_UPDATE_FAIL,
        isLoading: false,
      };
    default:
      return state;
  }
};
