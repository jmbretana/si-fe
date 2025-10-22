import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TableProviders from "./TableProviders";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import { TittleHeader } from "@common";
import { COLORS } from "@values/colors";

//

const Providers = () => {
  const navigate = useNavigate();

  const handlerEditProvider = (id: string) => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("previousUrl", currentUrl);
    navigate("/proveedor/" + id);
  };

  return (
    <Box paddingBottom={4}>
      <TittleHeader
        title={"Proveedores"}
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
        onAdd={() => handlerEditProvider("new")}
      />

      <TableProviders onEdit={(id) => handlerEditProvider(id.toString())} />
    </Box>
  );
};

export default Providers;
