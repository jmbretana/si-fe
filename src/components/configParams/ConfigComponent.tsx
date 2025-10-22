import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfigParams } from "@interfaces";
import Loading from "@common/Loading";
import { Alert, Box, FormLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { COLORS } from "@values/colors";
import SaveIcon from "@mui/icons-material/Save";

import { GetAllParams, UpdateConfig } from "@actions/configParamsActions";
import { AppDispatch, RootState } from "src/middleware/store/store";

import {
  ButtonBack,
  ButtonComponent,
  FormGridColumn,
  TittleHeader,
} from "@common";

import { Input } from "@common/input";

import {
  CONFIG_GETALL_SUCCESS,
  CONFIG_CREATE_SUCCESS,
} from "src/middleware/types/ConfigParamsActionTypes";

//

const ConfigParamsComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<ConfigParams>({
    cae: "",
    cae_fecha_vto: "",
  });

  const { configParams, status } = useSelector(
    (state: RootState) => state.configParams
  );

  useEffect(() => {
    dispatch(GetAllParams());
  }, []);

  useEffect(() => {
    if (status === CONFIG_GETALL_SUCCESS && configParams) {
      setLoading(false);
      setFormData({
        cae: configParams.cae,
        cae_fecha_vto: configParams.cae_fecha_vto,
      });
    }

    if (status === CONFIG_CREATE_SUCCESS && configParams) {
      setOpen(true);
    }
  }, [status]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(UpdateConfig(formData));
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      default:
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleCancel = () => {
    navigate("/presupuestos");
  };

  const formView = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid
          container
          spacing={3}
          sx={(theme) => ({
            padding: "20px",
            borderRadius: "10px",
            backgroundColor:
              theme.palette.mode === "dark" ? COLORS.white : COLORS.white,
          })}
        >
          <FormGridColumn size={{ xs: 4, md: 4 }}>
            <FormLabel>CAE</FormLabel>
            <Input
              id="cae"
              label=""
              name="cae"
              required={true}
              value={formData.cae}
            />
          </FormGridColumn>
          <FormGridColumn size={{ xs: 8 }}></FormGridColumn>

          <FormGridColumn size={{ xs: 4 }}>
            <FormLabel>Fecha vencimiento CAE</FormLabel>
            <Input
              id="cae_fecha_vto"
              label=""
              name="cae_fecha_vto"
              required={true}
              value={formData.cae_fecha_vto}
            />
          </FormGridColumn>

          <FormGridColumn size={{ xs: 12 }}>
            <Box justifyContent={"end"} display={"flex"}>
              {" "}
              <ButtonComponent
                text="Cancelar"
                color="secondary"
                onClick={() => handleCancel()}
                sx={{
                  marginRight: "10px",
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                variant="text"
              />{" "}
              <ButtonComponent
                type="submit"
                startIcon={<SaveIcon />}
                text="Grabar"
                sx={{
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                color="secondary"
                onClick={() => undefined}
              />
            </Box>
          </FormGridColumn>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} paddingBottom={8}>
        <TittleHeader title={"Configuración"} />
        <ButtonBack
          //
          onClick={() => handleCancel()}
        />{" "}
      </Box>

      <>
        {loading && <Loading />}
        {!loading && formView()}
      </>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Adjusted for top right position
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Configuración actualizada :)
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConfigParamsComponent;
