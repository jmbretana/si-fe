import {
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_MAKE_REQ,
  ACCOUNT_GETBYCLIENT_SUCCESS,
  ACCOUNT_GETCLIENTS_SUCCESS,
  ACCOUNT_GET_FAIL,
  ACCOUNT_GETBALANCES_CLIENTS_SUCCESS,
  ACCOUNT_REMOVE_SUCCESS,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
} from "@types/AccountActionTypes";
import { Action, Account, Accounts, Balance } from "@interfaces";

interface AccountsState {
  account: Account | undefined;
  accounts: Account[];
  accountsClient: Accounts[];
  balances: Balance[];
  statusAccount: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: AccountsState = {
  account: undefined,
  accounts: [],
  accountsClient: [],
  balances: [],
  statusAccount: ACCOUNT_MAKE_REQ,
  error: null,
  isLoading: false,
};

export const AccountReducer = (
  state = initialState,
  action: Action
): AccountsState => {
  switch (action.type) {
    case ACCOUNT_MAKE_REQ:
      return {
        ...state,
        statusAccount: ACCOUNT_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };
    case ACCOUNT_GETBYCLIENT_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_GETBYCLIENT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        accounts: action.payload as Account[],
      };
    case ACCOUNT_GETCLIENTS_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_GETCLIENTS_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        accountsClient: action.payload as Accounts[],
      };

    case ACCOUNT_GETBALANCES_CLIENTS_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_GETBALANCES_CLIENTS_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        balances: action.payload as Balance[],
      };

    case ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        account: action.payload as Account,
      };
    case ACCOUNT_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        accounts: [],
      };
    case ACCOUNT_REMOVE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_REMOVE_SUCCESS,
        isLoading: false,
      };
    case ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        statusAccount: ACCOUNT_UPDATE_SUCCESS,
        isLoading: false,
        account: action.payload as Account,
      };
    case ACCOUNT_UPDATE_FAIL:
      return {
        ...state,
        statusAccount: ACCOUNT_UPDATE_FAIL,
        isLoading: false,
      };
    default:
      return state;
  }
};
