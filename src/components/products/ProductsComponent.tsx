import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";

import ProductsTableComponent from "./ProductsTableComponent";
import ProductsImport from "./import/ProductsImport";

import { ButtonAdd, ButtonComponent, TittleHeader } from "@common";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

import { GetAllProducts, UpdateProduct } from "@actions/productsActions";
import { Product } from "@interfaces";
import { COLORS } from "@values/colors";

import {
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";

const ProductsComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const [view, setView] = useState("table");
  const initialFetchRef = React.useRef(false);

  useEffect(() => {
    if (!initialFetchRef.current && (!products || products.length === 0)) {
      initialFetchRef.current = true;
      dispatch(GetAllProducts());
    }

    if (status === PRODUCT_GETALL_SUCCESS && products.length > 0) {
      setData([...products]);
      setLoading(false);
    }

    if (status === PRODUCT_UPDATE_SUCCESS) {
      setLoading(false);
      dispatch(GetAllProducts());
    }

    if (products.length > 0) {
      setData([...products]);
      setLoading(false);
    }
  }, [status, products]);

  const handlerImportProduct = () => {
    setView("import");
  };

  const handlerEditProduct = (id: string) => {
    navigate("/producto/" + id);
  };

  const handlerEditActiveProduct = (id: string, active: boolean) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      const data = {
        ...product,
        deshabilitado: !active,
      };

      dispatch(UpdateProduct(data));

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, deshabilitado: !active } : item
        )
      );
    }
  };

  return (
    <Box id="section-dashboard" marginBottom={5}>
      <Box display={"flex"} justifyContent={"space-between"} paddingBottom={2}>
        <TittleHeader title={"Productos"} />

        <Box display="flex" gap="5px">
          <ButtonComponent
            sx={{
              background: COLORS.blue_light,
              color: COLORS.blue_dark,
            }}
            startIcon={<ImportExportOutlinedIcon />}
            text="Importar"
            //
            onClick={handlerImportProduct}
          />

          <ButtonAdd
            title="Agregar"
            //
            onClick={() => handlerEditProduct("new")}
          />
        </Box>
      </Box>

      {loading && <Loading />}
      {!loading && view === "table" && (
        <ProductsTableComponent
          data={data}
          //
          onEdit={(id) => handlerEditProduct(id)}
          onEditActive={handlerEditActiveProduct}
        />
      )}

      {!loading && view === "import" && (
        <ProductsImport data={data} onBack={() => setView("table")} />
      )}
    </Box>
  );
};

export default ProductsComponent;
