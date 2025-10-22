import React, { useEffect, useState } from "react";
import { COLORS } from "@values/colors";
import { Box } from "@mui/material";

import { AutocompleteTipoComprobanteProvider } from "@components/common/autocomplete";
import { makeStyles, createStyles } from "@mui/styles";
import { Input, InputMoney } from "@common/input";
import { ButtonAdd, FormGridColumn, FormLabel } from "@common";
import { CreateAccountProvider } from "@actions/accountsProviderActions";
import { getFechaActual } from "@utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";

import { AccountProvider, ErrorControl } from "@interfaces";
import {
  ACCOUNT_PROVIDER_CREATE_SUCCESS,
  ACCOUNT_PROVIDER_REMOVE_SUCCESS,
} from "@AccountProviderActionTypes";
import { EnumTipoComprobanteProvider } from "@enum";
//

// styles
const useStyles = makeStyles(() =>
  createStyles({
    boxContainer: {
      padding: "20px",
      borderRadius: "20px",
      border: "2px solid " + COLORS.grey_light,
      background: COLORS.white,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "20px",
    },
  })
);

interface ProviderAccountProps {
  id: number;
  //
  onRefreshSaldo: () => void;
}

const ProviderBalanceForm: React.FunctionComponent<ProviderAccountProps> = (
  props
) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { statusAccount } = useSelector((state: RootState) => state.accounts);

  const [errorControl, setErrorControl] = useState<ErrorControl>({
    fieldError: "",
    messageError: "",
    statusError: false,
  });

  //
  useEffect(() => {
    if (
      statusAccount === ACCOUNT_PROVIDER_CREATE_SUCCESS ||
      statusAccount === ACCOUNT_PROVIDER_REMOVE_SUCCESS
    ) {
      cleanErrorControl();
      cleanFormData();

      props.onRefreshSaldo();
    }
  }, [statusAccount]);

  //

  const [formData] = useState<AccountProvider>({
    provider_id: props.id,
    comprobante: "",
    fecha: getFechaActual(),
    fecha_tran: "",
    tipo: "",
    tipoPago: "",
    saldo: 0,
    saldoCalculado: 0,
    comentarios: "",
  });

  const cleanFormData = () => {
    formData.comprobante = "";
    formData.fecha = getFechaActual();
    formData.fecha_tran = "";
    formData.tipo = "";
    formData.tipoPago = "";
    formData.saldo = 0;
    formData.saldoCalculado = 0;
    formData.comentarios = "";
  };

  const validateField = () => {
    const errorControl: ErrorControl = {
      fieldError: "",
      messageError: "",
      statusError: false,
    };

    if (!formData.comprobante) {
      errorControl.fieldError = "Comprobante is required";
      errorControl.messageError = "Ingrese el comprobante";
      errorControl.statusError = true;
      setErrorControl(errorControl);
      return false;
    }

    if (!formData.tipo) {
      errorControl.fieldError = "Tipo is required";
      errorControl.messageError = "Seleccione el tipo";
      errorControl.statusError = true;
      setErrorControl(errorControl);

      return false;
    }

    if (formData.saldo === 0) {
      errorControl.fieldError = "Monto is required";
      errorControl.messageError = "Ingrese un monto";
      errorControl.statusError = true;
      setErrorControl(errorControl);

      return false;
    }

    if (formData.saldo < 0) {
      errorControl.fieldError = "Monto is invalid";
      errorControl.messageError = "Ingrese un monto positivo";
      errorControl.statusError = true;
      setErrorControl(errorControl);

      return false;
    }

    return true;
  };

  const cleanErrorControl = () => {
    setErrorControl({
      fieldError: "",
      messageError: "",
      statusError: false,
    });
  };

  const handleAdd = () => {
    if (validateField()) {
      cleanErrorControl();
      dispatch(CreateAccountProvider(formData));
    }
  };

  const handleSelectTipoComprobante = (value: string) => {
    formData.tipo = value;
    calcularSaldo();
  };

  const handleComprobante = (value: string) => {
    formData.comprobante = value;
  };

  const handleMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const saldo = parseFloat(e.target.value) ? parseFloat(e.target.value) : 0;
    formData.saldo = saldo;
    calcularSaldo();
  };

  const calcularSaldo = () => {
    const saldo = formData.saldo;
    if (formData.tipo === EnumTipoComprobanteProvider.NODECLARADO) {
      formData.saldoCalculado = saldo * 0.9;
    } else {
      formData.saldoCalculado = saldo;
    }
  };

  const handleChangeComentarios = (value: string) => {
    formData.comentarios = value;
  };

  const formAdd = (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        paddingTop={"10px"}
        sx={{ gap: "20px" }}
      >
        <FormGridColumn size={{ xs: 2 }}>
          <FormLabel>Nro. Comprobante</FormLabel>
          <Input
            id="comprobante"
            name="comprobante"
            label=""
            //
            onChange={handleComprobante}
          />
        </FormGridColumn>

        <FormGridColumn size={{ xs: 2 }}>
          <FormLabel>Monto</FormLabel>
          <InputMoney
            id="monto"
            label=""
            name="monto"
            required={true}
            onChange={handleMonto}
          />
        </FormGridColumn>
        <FormGridColumn size={{ xs: 2 }}>
          <FormLabel>Tipo</FormLabel>
          <AutocompleteTipoComprobanteProvider
            value={formData.tipo}
            //
            onSelect={handleSelectTipoComprobante}
          />
        </FormGridColumn>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        paddingTop={"10px"}
        sx={{ gap: "20px" }}
      >
        <FormGridColumn size={{ xs: 10 }}>
          <FormLabel>Comentarios</FormLabel>
          <Input
            id="comentarios"
            name="comentarios"
            label=""
            sx={{
              width: "650px !important",
            }}
            onChange={handleChangeComentarios}
          />
        </FormGridColumn>
        <FormGridColumn
          size={{ xs: 2 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonAdd
            title="Agregar"
            //
            onClick={() => handleAdd()}
          />
        </FormGridColumn>
      </Box>
    </Box>
  );

  return (
    <Box id="section-dashboard" marginBottom={5}>
      <Box display={"flex"} flexDirection={"column"}>
        <Box className={classes.boxContainer}>
          {formAdd}
          {errorControl.statusError && (
            <Box color="error.main" marginTop={2}>
              {errorControl.messageError}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderBalanceForm;
