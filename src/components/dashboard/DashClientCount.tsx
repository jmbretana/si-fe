import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@common/Loading";

import { CLIENT_GETALL_COUNT_SUCCESS } from "src/middleware/types/ClientActionTypes";
import { GetAllClientsCount } from "@actions/clientsActions";

const CardClientCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const clientCount = useSelector((state: RootState) => state.clients.count); // Adjust according to your state shape
  const clientStatus = useSelector((state: RootState) => state.clients.status);
  const clientLoading = useSelector(
    (state: RootState) => state.clients.isLoading
  );

  const [countClientes, setCountClientes] = useState(0);
  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetAllClientsCount());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (clientStatus === CLIENT_GETALL_COUNT_SUCCESS) {
      setCountClientes(Number(clientCount));
    }
  }, [clientStatus]);

  //

  const handleClick = () => {
    navigate("/clientes");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Clientes
        </Typography>

        {clientLoading && <Loading />}
        {!clientLoading && (
          <Typography component="h1" variant="h1" gutterBottom>
            {countClientes}
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

export default CardClientCount;
