import React from "react";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@common/Loading";

import { PRODUCT_GETALL_COUNT_SUCCESS } from "src/middleware/types/ProductActionTypes";
import { GetAllCount } from "@actions/productsActions";

const CardProductCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const count = useSelector((state: RootState) => state.products.count); // Adjust according to your state shape
  const status = useSelector((state: RootState) => state.products.status);
  const loading = useSelector((state: RootState) => state.products.isLoading);

  const [countProductos, setCountProductos] = useState(0);
  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetAllCount());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (status === PRODUCT_GETALL_COUNT_SUCCESS) {
      setCountProductos(Number(count));
    }
  }, [status]);

  //

  const handleClick = () => {
    navigate("/productos");
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Productos
        </Typography>
        {loading && <Loading />}
        {!loading && (
          <Typography component="h1" variant="h1" gutterBottom>
            {countProductos}
          </Typography>
        )}
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardProductCount;
