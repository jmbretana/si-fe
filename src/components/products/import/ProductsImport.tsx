import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Papa from "papaparse";
import Loading from "@common/Loading";

import { Product } from "@interfaces";
import { COLORS } from "@values/colors";
import { ButtonBack, ButtonUpload } from "@common";

import ProductsImportCreate from "./ProductsImportCreate";
import ProductsImportUpdate from "./ProductsImportUpdate";

interface ProductsImportProps {
  data: Product[];
  //
  onBack: () => void;
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
  const [loading, setLoading] = useState<boolean>(false);

  const [productList, setProductList] = useState<ProductList[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [listType, setListType] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (productList.length > 0) {
        setLoading(false);
        setShow(true);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [productList.length]);

  // 1. handleFileUpload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parsedData = Papa.parse<string[]>(text, { header: false }).data;

        const tipoLista = parsedData.slice(2)[0][0];
        if (tipoLista === "V") {
          checkProductsListaV(parsedData);
          setListType("V");
        } else {
          checkProductsListaA(parsedData);
          setListType("A");
        }
      };
      reader.readAsText(file, "ISO-8859-3");
    }
  };
  // end 1. handleFileUpload

  // 2. addNewProductToList
  const checkProduct = (row: string[], data: Product[], sublista: string) => {
    return data.find(
      (product) =>
        product.producto === row[0] &&
        product.cantidad === row[1] &&
        product.sublista === sublista
    );
  };

  const saveInArrayProduct = (productList: ProductList, price: number) => {
    return {
      id: productList!.id,
      producto: productList!.producto,
      cantidad: productList!.cantidad,
      lista: productList!.lista,
      sublista: productList!.sublista,
      precioAnterior: productList!.precio,
      precio: price,
      exist: true,
    };
  };

  const checkProductsListaA = (csvData: string[][]) => {
    let newRows: ProductList[] = [];

    setLoading(true);

    csvData.slice(1).map((row: string[]) => {
      const priceESP = clearPrice(row[3]);
      const priceSILVIO = clearPrice(row[4]);
      const priceB = clearPrice(row[5]);
      const priceBTO = clearPrice(row[6]);
      const priceGRAL = clearPrice(row[7]);

      const checkProductB = checkProduct(row, props.data, "B");
      const checkProductBTO = checkProduct(row, props.data, "BTO");
      const checkProductESP = checkProduct(row, props.data, "ESP");
      const checkProductGRAL = checkProduct(row, props.data, "GRAL");
      const checkProductSILVIO = checkProduct(row, props.data, "SILVIO");

      newRows = productList;
      let newProduct = true;

      if (checkProductB !== undefined) {
        // sublista B
        const newRow: ProductList = saveInArrayProduct(checkProductB, priceB);

        if (checkPrecio(checkProductB!.precio!, priceB)) {
          newRows.push(newRow);
        }

        newProduct = false;
      }

      if (checkProductBTO !== undefined) {
        // sublista BTO
        const newRow = saveInArrayProduct(checkProductBTO, priceBTO);

        if (checkPrecio(checkProductBTO!.precio!, priceBTO)) {
          newRows.push(newRow);
        }
        newProduct = false;
      }

      if (checkProductESP !== undefined) {
        // sublista ESP
        const newRow = saveInArrayProduct(checkProductESP, priceESP);
        if (checkPrecio(checkProductESP!.precio!, priceESP)) {
          newRows.push(newRow);
        }
        newProduct = false;
      }

      if (checkProductGRAL !== undefined) {
        // sublista GRAL
        const newRow = saveInArrayProduct(checkProductGRAL, priceGRAL);
        if (checkPrecio(checkProductGRAL!.precio!, priceGRAL)) {
          newRows.push(newRow);
        }
      }

      if (checkProductSILVIO !== undefined) {
        // sublista SILVIO
        const newRow = saveInArrayProduct(checkProductSILVIO, priceSILVIO);
        if (checkPrecio(checkProductSILVIO!.precio!, priceSILVIO)) {
          newRows.push(newRow);
        }
      }

      setProductList(newRows);

      if (newProduct) addNewProductToList(row);
    });
  };

  const checkProductsListaV = (csvData: string[][]) => {
    let newRows: ProductList[] = [];

    setLoading(true);

    csvData.slice(1).map((row: string[]) => {
      if (row[1] !== "" && row[1] !== undefined) {
        const precioUnidad = clearPrice(row[4]);
        const precioBulto = clearPrice(row[5]);

        const checkProductUnidad = props.data.find(
          (product) =>
            product.producto.toUpperCase() === row[1].toUpperCase() &&
            product.cantidad.toUpperCase() === row[2].toUpperCase() &&
            product.sublista === "UNIDAD"
        );

        const checkProductBulto = props.data.find(
          (product) =>
            product.producto.toUpperCase() === row[1].toUpperCase() &&
            product.cantidad.toUpperCase() === row[2].toUpperCase() &&
            product.sublista === "BULTO"
        );

        newRows = productList;
        let newProduct = true;

        if (checkProductUnidad !== undefined) {
          const newRow = saveInArrayProduct(checkProductUnidad, precioUnidad);

          if (checkPrecio(checkProductUnidad!.precio!, precioUnidad)) {
            newRows.push(newRow);
          }

          newProduct = false;
        }

        if (checkProductBulto !== undefined) {
          const newRow = saveInArrayProduct(checkProductBulto, precioBulto);
          if (checkPrecio(checkProductBulto!.precio!, precioBulto)) {
            newRows.push(newRow);
          }

          newProduct = false;
        }

        setProductList(newRows);
        if (newProduct) addNewProductToListV(row);
      }
    });
  };

  const addNewProductToList = (row: string[]) => {
    let newRows: ProductList[] = [];
    const priceESP = clearPrice(row[3]);
    const priceSILVIO = clearPrice(row[4]);
    const priceB = clearPrice(row[5]);
    const priceBTO = clearPrice(row[6]);
    const priceGRAL = clearPrice(row[7]);

    const productName = row[0].toLocaleUpperCase();

    if (
      row[0].substring(0, 15) !== "Z NUEVO PRODUCT" &&
      row[0].substring(0, 15) !== ""
    ) {
      newRows = productList;
      let newRow: ProductList = {
        producto: productName,
        lista: "A",
        sublista: "B",
        cantidad: row[1],
        precio: Number(priceB),
        exist: false,
      };
      newRows.push(newRow);
      setProductList(newRows);

      newRow = {
        producto: productName,
        lista: "A",
        sublista: "BTO",
        cantidad: row[1],
        precio: Number(priceBTO),
        exist: false,
      };
      newRows.push(newRow);
      setProductList(newRows);

      newRow = {
        producto: productName,
        lista: "A",
        sublista: "ESP",
        cantidad: row[1],
        precio: Number(priceESP),
        exist: false,
      };
      newRows.push(newRow);
      setProductList(newRows);

      newRow = {
        producto: productName,
        lista: "A",
        sublista: "GRAL",
        cantidad: row[1],
        precio: Number(priceGRAL),
        exist: false,
      };
      newRows.push(newRow);
      setProductList(newRows);

      newRow = {
        producto: productName,
        lista: "A",
        sublista: "SILVIO",
        cantidad: row[1],
        precio: Number(priceSILVIO),
        exist: false,
      };
      newRows.push(newRow);
      setProductList(newRows);
    } else {
      setLoading(false);
      setShow(true);
    }
  };

  const addNewProductToListV = (row: string[]) => {
    let newRows: ProductList[] = [];
    const priceUnidad = clearPrice(row[4]);
    const priceBulto = clearPrice(row[5]);
    const productName = row[1].toLocaleUpperCase();

    newRows = productList;
    let newRow = {
      producto: productName,
      cantidad: row[2],
      lista: "V",
      sublista: "UNIDAD",
      precio: Number(priceUnidad),
      exist: false,
    };

    newRows.push(newRow);
    setProductList(newRows);

    newRow = {
      producto: productName,
      lista: "V",
      sublista: "BULTO",
      cantidad: row[2],
      precio: Number(priceBulto),
      exist: false,
    };
    newRows.push(newRow);
    setProductList(newRows);
  };

  const clearPrice = (price: string | undefined) => {
    let returnPrice = 0;
    if (price !== undefined) {
      returnPrice = Number(price.replace(/[$.]/g, "").replace(/,/g, "."));
    } else {
      returnPrice = 0;
    }

    return returnPrice;
  };

  const checkPrecio = (precioAnterior: number, precioNuevo: number) => {
    return precioAnterior !== precioNuevo;
  };
  // end 2. addNewProductToList

  const handleCancel = () => {
    props.onBack();
  };

  //
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          sx={{
            color: COLORS.grey,
            marginBottom: 2,
          }}
        >
          Importar Productos
        </Typography>
        <ButtonBack onClick={() => handleCancel()} />{" "}
      </Box>

      <Box display="flex" gap={2} flexDirection={"column"} width={700}>
        <Box
          display="flex"
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography>Seleccione el archivo .csv a controlar</Typography>
          <ButtonUpload onUpload={handleFileUpload} />
        </Box>
      </Box>
      <Box>{loading && <Loading />}</Box>

      <Box mt={4}>
        <Box>
          {!loading && show && (
            <ProductsImportUpdate
              type={listType}
              productList={productList.filter(
                (product) => product.exist === true
              )}
            />
          )}
        </Box>

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        <Box>
          {!loading && show && (
            <ProductsImportCreate
              type={listType}
              productList={productList.filter(
                (product) => product.exist === false
              )}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductsImportComponent;
