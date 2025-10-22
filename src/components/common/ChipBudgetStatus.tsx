import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";
import { EnumStatusBudget } from "@enum";

interface ChipBudgetStatusProps {
  value: string;
}

const ChipBudgetStatus: React.FunctionComponent<ChipBudgetStatusProps> = (
  props
) => {
  let bgColor = "";
  let fontColor = "";

  switch (props.value) {
    case EnumStatusBudget.GENERADO:
      bgColor = COLORS.grey_light;
      fontColor = COLORS.blue_dark;
      break;
    case EnumStatusBudget.ENVIADO:
      bgColor = COLORS.orange_dark;
      fontColor = COLORS.white;
      break;
    case EnumStatusBudget.FACTURADO:
      bgColor = COLORS.blue_dark;
      fontColor = COLORS.grey_light;
      break;
  }

  return (
    <Box
      sx={{
        background: bgColor,
        color: fontColor,
        borderRadius: "20px",
        padding: "1px 10px",
        fontWeight: 400,
        textAlign: "center",
      }}
    >
      {props.value}
    </Box>
  );
};

export default ChipBudgetStatus;
