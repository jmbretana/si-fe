import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TableClientsComponent from "./ClientsTableComponent.tsx";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import { TittleHeader } from "@common";
import { COLORS } from "@values/colors";

//

const ClientsComponent = () => {
  const navigate = useNavigate();

  const handlerEditClient = (id: string) => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("previousUrl", currentUrl);
    navigate("/cliente/" + id);
  };

  return (
    <Box paddingBottom={4}>
      <TittleHeader
        title={"Clientes"}
        icon={
          <GroupOutlinedIcon
            sx={{
              color: COLORS.grey,
              fontSize: 30,
              marginTop: "5px",
              marginRight: "10px",
            }}
          />
        }
        onAdd={() => handlerEditClient("new")}
      />

      <TableClientsComponent
        onEdit={(id) => handlerEditClient(id.toString())}
      />
    </Box>
  );
};

export default ClientsComponent;
