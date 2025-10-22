import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";

import { AppDispatch } from "src/middleware/store/store";
import { Product } from "@interfaces";
import { COLORS } from "@values/colors";
import { ButtonComponent } from "@common";
import { CreateProduct } from "@actions/productsActions";

import ProductsImportNewTable from "./ProductsImportNewTable";

interface ProductsImportProps {
  type: string;
  productList: ProductList[];
}

export interface ProductList {
  id?: string;
  lista?: string;
  sublista?: string;
  cantidad: string;
  producto: string;
  precio?: number;
  precioAnterior?: number;
  exist?: boolean;
}

const ProductsImportCreate: React.FunctionComponent<ProductsImportProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();
  const counterTotalToCreate: number = props.productList.length;
  const productList: ProductList[] = props.productList;

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [counterCreate, setCounterCreate] = useState<number>(0);

  const createProducts = async () => {
    let counter = 1;
    setLoadingUpdate(true);
    try {
      const promises = productList
        .filter((product) => product.exist === false)
        .map((product, index) => {
          const productCreate: Product = {
            id: product.id,
            cantidad: product.cantidad,
            producto: product.producto,
            precio: Number(product.precio),
            lista: product.lista,
            sublista: product.sublista,
          };
          const delay = index * 300;
          const timeoutId = setTimeout(() => {
            dispatch(CreateProduct(productCreate));
            setCounterCreate(counter);
            counter++;
          }, delay);
          return () => clearTimeout(timeoutId);
        });
      await Promise.all(promises);
    } finally {
      setLoadingUpdate(false);
    }
  };

  //

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={2}
      >
        <Typography
          variant="h6"
          sx={{
            color: COLORS.grey,
            marginBottom: 2,
          }}
        >
          Productos Nuevos - {props.type}
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
          alignContent={"end"}
          mt={2}
          mb={2}
          sx={{
            backgroundColor: COLORS.orange_light,
            borderRadius: 5,
            padding: "0 15px",
          }}
        >
          <Typography
            sx={{
              color: COLORS.blue_dark,
              fontSize: "1.5em",
              fontWeight: 700,
            }}
          >
            {counterTotalToCreate}{" "}
          </Typography>
          <Typography
            sx={{
              color: COLORS.blue_dark,
              fontSize: "1em",
            }}
          >
            productos a crear
          </Typography>
        </Box>
      </Box>
      {counterTotalToCreate > 0 && (
        <>
          <ProductsImportNewTable data={productList} />
          <Box mt={2}>
            {counterCreate !== counterTotalToCreate && (
              <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                <ButtonComponent
                  text="Ejecutar creación"
                  variant="contained"
                  loading={loadingUpdate}
                  //
                  onClick={createProducts}
                />
                <Box>
                  {counterCreate} de {counterTotalToCreate}
                </Box>
              </Box>
            )}
            {counterCreate === counterTotalToCreate && (
              <Box
                sx={{
                  color: COLORS.green_dark,
                  fontSize: "1em",
                  fontWeight: 700,
                  border: `2px solid ${COLORS.green_light}`,
                  borderRadius: 5,
                  padding: "5px 15px",
                  backgroundColor: COLORS.green_light,
                }}
              >
                Creación de productos finalizada :)
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default ProductsImportCreate;
