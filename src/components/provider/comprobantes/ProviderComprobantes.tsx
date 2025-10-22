import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import ProviderComprobanteDetail from "./ProviderComprobanteDetail";
import ProviderComprobantesForm from "./ProviderComprobantesForm";
import ModalMovementDelete from "./ModalMovementDelete";
import ModalMovementEdit from "./ModalMovementEdit";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";

import {
  RemoveComprobanteProvider,
  UpdateComprobanteProvider,
  GetAllComprobantesByProvider,
} from "@actions/comprobanteProviderActions";

import {
  COMPROBANTE_PROVIDER_CREATE_SUCCESS,
  COMPROBANTE_PROVIDER_GETALL_SUCCESS,
  COMPROBANTE_PROVIDER_REMOVE_SUCCESS,
  COMPROBANTE_PROVIDER_UPDATE_SUCCESS,
} from "@ComprobanteProviderActionTypes";

import { ComprobanteProvider, Provider } from "@interfaces";
//

interface ProviderBalanceProps {
  provider: Provider;
  //
  onRefreshSaldo: () => void;
}

const ProviderComprobantes: React.FunctionComponent<ProviderBalanceProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();

  const { comprobantes, statusComprobantes } = useSelector(
    (state: RootState) => state.comprobantesProvider
  );

  const [selectedComprobante, setSelectedComprobante] =
    useState<ComprobanteProvider>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ComprobanteProvider[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  //

  useEffect(() => {
    dispatch(
      GetAllComprobantesByProvider(props.provider.proveedor_id!.toString())
    );
  }, []);

  useEffect(() => {
    if (statusComprobantes === COMPROBANTE_PROVIDER_GETALL_SUCCESS) {
      setData(comprobantes as ComprobanteProvider[]);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [comprobantes]);

  useEffect(() => {
    if (
      statusComprobantes === COMPROBANTE_PROVIDER_CREATE_SUCCESS ||
      statusComprobantes === COMPROBANTE_PROVIDER_UPDATE_SUCCESS ||
      statusComprobantes === COMPROBANTE_PROVIDER_REMOVE_SUCCESS
    ) {
      dispatch(
        GetAllComprobantesByProvider(props.provider.proveedor_id!.toString())
      );
    }
  }, [statusComprobantes]);

  const removeMovement = (row: ComprobanteProvider) => {
    setSelectedComprobante(row);
    setOpenDelete(true);
  };

  const editMovement = (row: ComprobanteProvider) => {
    setSelectedComprobante(row);
    setOpenEdit(true);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = (id: string) => {
    dispatch(RemoveComprobanteProvider(id));
    setOpenDelete(false);
  };

  const handleConfirmEdit = (comprobante: ComprobanteProvider) => {
    dispatch(UpdateComprobanteProvider(comprobante));
    setOpenEdit(false);
  };

  const onRefreshSaldo = () => {
    props.onRefreshSaldo();
  };

  return (
    <Box marginBottom={5} sx={{ padding: 0 }}>
      <Box display={"flex"} flexDirection={"column"}>
        <ProviderComprobantesForm
          id={props.provider.proveedor_id!}
          onRefreshSaldo={onRefreshSaldo}
        />
        <ProviderComprobanteDetail
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
        comprobante={selectedComprobante}
        //
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <ModalMovementEdit
        open={openEdit}
        comprobante={selectedComprobante}
        onClose={() => setOpenEdit(false)}
        onConfirm={handleConfirmEdit}
      />
    </Box>
  );
};

export default ProviderComprobantes;
