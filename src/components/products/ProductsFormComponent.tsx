import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "@interfaces";
import Loading from "@common/Loading";

import { Alert, Box, Switch, FormLabel, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { COLORS } from "@values/colors";
import { formatTimestamp } from "@utils/utils";

import SaveIcon from "@mui/icons-material/Save";

import {
  GetProduct,
  CreateProduct,
  UpdateProduct,
} from "@actions/productsActions";

import { AppDispatch, RootState } from "src/middleware/store/store";

import {
  ButtonBack,
  ButtonComponent,
  FormGridColumn,
  TittleHeader,
} from "@common";
import AutocompleteListaProduct from "@common/autocomplete/AutocompleteListaProducto";
import AutocompleteSubListaProduct from "@common/autocomplete/AutocompleteSubListaProducto";

import { Input, InputMoney } from "@common/input";

import {
  PRODUCT_GET_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";

//

const FormProductComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const [lista, setLista] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);

  let first = true;

  const [formData, setFormData] = useState<Product>({
    producto: "",
    cantidad: "",
    lista: "",
    sublista: "",
    precio: 0,
  });

  const product = useSelector(
    (state: RootState) => state.products.product
  ) as Product;
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (id !== "new" && first) {
      first = false;
      setEdit(true);
      dispatch(GetProduct(id!));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === PRODUCT_GET_SUCCESS && product) {
      setLoading(false);
      setFormData({
        id: id,
        producto: product.producto,
        cantidad: product.cantidad,
        lista: product.lista,
        sublista: product.sublista,
        precio: product.precio,
        deshabilitado: product.deshabilitado,
      });
      setDisableCheck(product.deshabilitado ? false : true);
      setLista(product.lista);
    }

    if (status === PRODUCT_CREATE_SUCCESS && product) {
      if (edit) {
        setOpen(true);
      } else {
        navigate("/productos");
      }
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
    if (edit) dispatch(UpdateProduct(formData));
    else dispatch(CreateProduct(formData));
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "producto":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.toUpperCase(),
        });
        break;
      case "cantidad":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.toUpperCase(),
        });
        break;
      case "deshabilitado":
        setDisableCheck(!disableCheck);
        setFormData({
          ...formData,
          [e.target.name]: disableCheck,
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
    navigate("/productos");
  };

  const filterListaHandler = (value: string) => {
    setLista(value);
    formData.lista = value;
  };

  const filterSubListaHandler = (value: string) => {
    formData.sublista = value;
  };

  const formProducto = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid
          container
          spacing={3}
          sx={(theme) => ({
            padding: "20px",
            borderRadius: "20px",
            backgroundColor:
              theme.palette.mode === "dark" ? COLORS.white : COLORS.white,
          })}
        >
          <FormGridColumn size={{ xs: 6, md: 6 }}>
            <FormLabel>Producto</FormLabel>
            <Input
              id="producto"
              label=""
              name="producto"
              required={true}
              value={formData.producto}
            />
          </FormGridColumn>
          <FormGridColumn size={{ xs: 3, md: 3 }}>
            <FormLabel>Presentacion</FormLabel>
            <Input
              id="cantidad"
              label=""
              name="cantidad"
              required={true}
              value={formData.cantidad}
            />
          </FormGridColumn>
          <FormGridColumn size={{ xs: 2 }}>
            <FormLabel>Precio</FormLabel>
            <InputMoney
              id="precio"
              label=""
              name="precio"
              required={true}
              value={formData.precio}
            />
          </FormGridColumn>
          <FormGridColumn size={{ xs: 1 }}>
            <FormLabel>Activo</FormLabel>
            <Switch
              checked={disableCheck}
              color="primary"
              name="deshabilitado"
            />
          </FormGridColumn>
          <Typography
            variant="h5"
            sx={{ marginTop: 5, color: COLORS.grey, fontWeight: 600 }}
          >
            Listas
          </Typography>
          <Box display={"flex"} width={"100%"}>
            <AutocompleteListaProduct
              all={false}
              value={formData.lista}
              //
              onSelect={(value) => filterListaHandler(value)}
            />
            <AutocompleteSubListaProduct
              all={false}
              lista={lista}
              value={formData.sublista}
              //
              onSelect={(value) => filterSubListaHandler(value)}
            />
          </Box>

          <Typography
            sx={{
              color: COLORS.grey,
              fontWeight: 400,
              fontSize: "0.9em",
            }}
          >
            Actualizado el:{" "}
            {product && product.updated
              ? formatTimestamp(product.updated) + "hs."
              : ""}
          </Typography>

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
        <TittleHeader
          title={id === "new" ? "Agregar Producto" : "Editar Producto"}
        />
        <ButtonBack
          //
          onClick={() => handleCancel()}
        />{" "}
      </Box>

      <>
        {loading && <Loading />}
        {!loading && formProducto()}
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
          Producto actualizado :)
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormProductComponent;
