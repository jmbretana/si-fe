import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";

import { AppDispatch } from "src/middleware/store/store";
import { Product } from "@interfaces";
import { COLORS } from "@values/colors";
import { ButtonComponent } from "@common";
import { UpdateProduct } from "@actions/productsActions";

import ProductsImportUpdateTable from "./ProductsImportUpdateTable";

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

const ProductsImportComponent: React.FunctionComponent<ProductsImportProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();
  const counterTotalToUpdate: number = props.productList.length;
  const productList: ProductList[] = props.productList;

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [counterUpdate, setCounterUpdate] = useState<number>(0);

  const updateProducts = async () => {
    let counter = 1;
    setLoadingUpdate(true);
    try {
      const promises = productList
        .filter((product) => product.exist === true)
        .map((product, index) => {
          const productUpdate: Product = {
            id: product.id,
            cantidad: product.cantidad,
            producto: product.producto,
            precio: Number(product.precio),
          };

          const delay = index * 400;

          return new Promise<void>((resolve) => {
            setTimeout(() => {
              dispatch(UpdateProduct(productUpdate));
              setCounterUpdate(counter);
              counter++;
              resolve();
            }, delay);
          });
        });

      await Promise.all(promises);
    } finally {
      setLoadingUpdate(false);
    }
  };

  //

  return (
    <>
      <Box mt={4}>
        <Box>
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
                Productos Existentes - Lista {props.type}
              </Typography>

              <Box
                display={"flex"}
                flexDirection={"row"}
                gap={1}
                alignItems={"center"}
                mb={2}
                sx={{
                  backgroundColor: COLORS.blue_light,
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
                  {
                    productList.filter((product) => product.exist === true)
                      .length
                  }{" "}
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.blue_dark,
                    fontSize: "1em",
                  }}
                >
                  productos a actualizar
                </Typography>
              </Box>
            </Box>
            {counterTotalToUpdate > 0 && (
              <>
                <ProductsImportUpdateTable data={productList} />
                <Box mt={2}>
                  {counterUpdate !== counterTotalToUpdate && (
                    <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                      <ButtonComponent
                        text="Ejecutar Actualización"
                        variant="contained"
                        loading={loadingUpdate}
                        //
                        onClick={updateProducts}
                      />
                      <Box>
                        {counterUpdate} de {counterTotalToUpdate}
                      </Box>
                    </Box>
                  )}
                  {counterUpdate === counterTotalToUpdate && (
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
                      Actualización de productos finalizada :)
                    </Box>
                  )}
                </Box>
              </>
            )}
          </>
        </Box>
      </Box>
    </>
  );
};

export default ProductsImportComponent;
