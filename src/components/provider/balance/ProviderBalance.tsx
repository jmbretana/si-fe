import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ProviderBalanceDetail from "./ProviderBalanceDetail";
import ProviderBalanceForm from "@components/provider/balance/ProviderBalanceForm";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";

import {
  GetAllAccounts,
  RemoveBalanceProvider,
  UpdateBalanceProvider,
} from "@actions/accountsProviderActions";
import {
  ACCOUNT_PROVIDER_CREATE_SUCCESS,
  ACCOUNT_PROVIDER_GETBY_SUCCESS,
  ACCOUNT_PROVIDER_REMOVE_SUCCESS,
  ACCOUNT_PROVIDER_UPDATE_SUCCESS,
} from "@AccountProviderActionTypes";

import { AccountProvider, Provider } from "@interfaces";
//
import ModalMovementDelete from "@components/provider/balance/ModalMovementDelete";
import ModalMovementEdit from "@components/provider/balance/ModalMovementEdit";

interface ProviderBalanceProps {
  provider: Provider;
  //
  onRefreshSaldo: () => void;
}

const ProviderBalance: React.FunctionComponent<ProviderBalanceProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();

  const { accountsProvider, statusAccount } = useSelector(
    (state: RootState) => state.accountsProvider
  );

  const [account, setAccount] = useState<AccountProvider>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AccountProvider[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  //

  useEffect(() => {
    dispatch(GetAllAccounts(props.provider.proveedor_id!.toString()));
  }, []);

  useEffect(() => {
    if (statusAccount === ACCOUNT_PROVIDER_GETBY_SUCCESS) {
      setData(accountsProvider as AccountProvider[]);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [accountsProvider]);

  useEffect(() => {
    if (
      statusAccount === ACCOUNT_PROVIDER_CREATE_SUCCESS ||
      statusAccount === ACCOUNT_PROVIDER_UPDATE_SUCCESS ||
      statusAccount === ACCOUNT_PROVIDER_REMOVE_SUCCESS
    ) {
      dispatch(GetAllAccounts(props.provider.proveedor_id!.toString()));
    }
  }, [statusAccount]);

  const removeMovement = (row: AccountProvider) => {
    setAccount(row);
    setOpenDelete(true);
  };

  const editMovement = (row: AccountProvider) => {
    setAccount(row);
    setOpenEdit(true);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = (id: string) => {
    dispatch(RemoveBalanceProvider(id));
    setOpenDelete(false);
  };

  const handleConfirmEdit = (account: AccountProvider) => {
    dispatch(UpdateBalanceProvider(account));
    setOpenEdit(false);
  };

  const onRefreshSaldo = () => {
    props.onRefreshSaldo();
  };

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"}>
        <ProviderBalanceForm
          id={props.provider.proveedor_id!}
          onRefreshSaldo={onRefreshSaldo}
        />
        <ProviderBalanceDetail
          provider={props.provider}
          accounts={data}
          loading={loading}
          //
          onEditMovement={editMovement}
          onRemoveMovement={removeMovement}
        />
      </Box>

      <ModalMovementDelete
        open={openDelete}
        account={account}
        //
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <ModalMovementEdit
        open={openEdit}
        account={account}
        onClose={() => setOpenEdit(false)}
        onConfirm={handleConfirmEdit}
      />
    </Box>
  );
};

export default ProviderBalance;
