import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { GetAllProductsFiltered } from "@actions/productsActions";

import { Client } from "@interfaces";
import { Product } from "@interfaces";

import { PRODUCT_GETALL_SUCCESS } from "src/middleware/types/ProductActionTypes";

interface ButtonProps {
  all?: boolean;
  client?: Client;
  value?: string;
  clear?: boolean;
  //
  onClear: () => void;
  onSelect: (value?: Product) => void;
}

const AutocompleteListaProducto: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));
  const dispatch = useDispatch<AppDispatch>();

  const { products }: { products: Product[] } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const status = useSelector((state: RootState) => state.products.status);
  const [productList, setProductList] = useState<Product[] | undefined>(
    undefined
  );

  let first = true;

  useEffect(() => {
    if (props.client !== undefined && first) {
      const paramsA = { lista: "A", sublista: props.client.lista_a };
      const paramsV = { lista: "V", sublista: props.client.lista_v };

      setProductList(undefined);

      dispatch(GetAllProductsFiltered(paramsA, paramsV));
      first = false;
    }
  }, []);

  useEffect(() => {
    if (status === PRODUCT_GETALL_SUCCESS && products) {
      setProductList(
        products.filter((product) => product.deshabilitado !== true)
      );
    }
  }, [products, status]);

  useEffect(() => {
    if (props.clear) {
      setSelectedProduct(null);
    }
  }, [props.clear]);

  const onSelectProductHandler = (value: any) => {
    if (value === "") {
      setSelectedProduct(null);
      props.onClear();
    }
  };

  const onSelectHandler = (event: any, value: any) => {
    setSelectedProduct(value); // Actualizar el valor seleccionad
    if (value) {
      props.onSelect(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const inputValue =
        event.currentTarget.querySelector<HTMLInputElement>("input")?.value;

      const matchedProduct = productList!.find(
        (product) => product.producto === inputValue
      );

      if (matchedProduct) {
        setSelectedProduct(matchedProduct);
        props.onSelect(matchedProduct);
      }
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        id="product-list"
        fullWidth
        options={productList ? productList : []}
        getOptionLabel={(option: any) => option.producto}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={handleKeyDown} // Manejar eventos de teclado
          />
        )}
        size="small"
        value={selectedProduct}
        //
        onChange={onSelectHandler}
        onInputChange={(value) => {
          onSelectProductHandler(value);
        }}
      />
    </ThemeProvider>
  );
};

export default AutocompleteListaProducto;
