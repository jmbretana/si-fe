import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Provider } from "@interfaces";
import { AppDispatch, RootState } from "src/middleware/store/store.tsx";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProvider, CreateProvider } from "@actions/providersAction.tsx";
import Loading from "@common/Loading";

import {
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_UPDATE_SUCCESS,
} from "src/middleware/types/ProviderActionTypes.tsx";

import SaveIcon from "@mui/icons-material/Save";

import { ButtonComponent, FormGridColumn } from "@common";
import { Input } from "@common/input";
import { COLORS } from "@values/colors";
//

interface ProviderProps {
  proveedor: Provider | undefined;
  loading: boolean;
  //
  onCancel: () => void;
}

const ProviderInfo: React.FunctionComponent<ProviderProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.providers.status);

  const [formData, setFormData] = useState<Provider>({
    _id: props.proveedor ? props.proveedor._id : "",
    proveedor: props.proveedor ? props.proveedor.proveedor : "",
    proveedor_id: props.proveedor ? props.proveedor.proveedor_id : 0,
  });

  useEffect(() => {
    if (status === PROVIDER_CREATE_SUCCESS) {
      if (props.proveedor === undefined) {
        props.onCancel();
      }
    }

    if (status === PROVIDER_UPDATE_SUCCESS) {
      props.onCancel();
    }
  }, [status]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (props.proveedor !== undefined) dispatch(UpdateProvider(formData));
    else dispatch(CreateProvider(formData));
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "cliente":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
        });
        break;
      case "domicilio":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
        });
        break;
      case "localidad":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
        });
        break;
      case "atencion":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
        });
        break;
      case "horario":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
        });
        break;
      default:
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const formClient = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid
          container
          spacing={3}
          sx={{
            border: "2px solid " + COLORS.grey_light,
            background: COLORS.white,
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          {formData.proveedor_id !== 0 && (
            <FormGridColumn size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ color: COLORS.grey, fontWeight: 400 }}
              >
                ID #{formData.proveedor_id}
              </Typography>
            </FormGridColumn>
          )}
          <FormGridColumn size={{ xs: 12, md: 8 }}>
            <Input
              id="proveedor"
              label="Proveedor"
              name="proveedor"
              required={true}
              value={formData.proveedor ? formData.proveedor : ""}
            />
          </FormGridColumn>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{
            marginTop: "15px",
          }}
        >
          <FormGridColumn size={{ xs: 12 }}>
            <FormGridColumn size={{ xs: 12 }}>
              <Box justifyContent={"end"} display={"flex"}>
                <ButtonComponent
                  text="Cancelar"
                  color="secondary"
                  onClick={() => handleCancel()}
                  sx={{
                    marginRight: "10px",
                    color: "#000",
                    fontWeight: 600,
                    borderRadius: "20px",
                    padding: "5px 20px",
                  }}
                  variant="text"
                />{" "}
                <ButtonComponent
                  startIcon={<SaveIcon />}
                  color="secondary"
                  onClick={() => undefined}
                  sx={{
                    borderRadius: "20px",
                    padding: "5px 20px",
                  }}
                  text="Grabar"
                  type="submit"
                />
              </Box>
            </FormGridColumn>
          </FormGridColumn>
        </Grid>
      </form>
    );
  };

  return (
    <>
      {props.loading && <Loading />}
      {!props.loading && formClient()}
    </>
  );
};

export default ProviderInfo;
