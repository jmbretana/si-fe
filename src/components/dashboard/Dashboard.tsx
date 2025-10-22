import React from "react";
import { Box } from "@mui/material";

import CardClientCount from "./DashClientCount";
import CardProductCount from "./DashProductCount";
import CardBudgetCount from "./DashBudgetCount";
import CardBudgetPerDay from "./DashBudgetPerDay";

import { TittleHeader } from "@common";

const Dashboard = () => {
  //

  return (
    <Box mb={5}>
      <TittleHeader title={"Dashboard"} />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingBottom={2}
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <Box
          sx={{
            width: { xs: "100%" },
          }}
        >
          <CardClientCount />
        </Box>
        <Box sx={{ width: { xs: "100%" } }}>
          <CardProductCount />
        </Box>
        <Box sx={{ width: { xs: "100%" } }}>
          <CardBudgetCount />
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%" } }}>
        <CardBudgetPerDay />
      </Box>
    </Box>
  );
};

export default Dashboard;
