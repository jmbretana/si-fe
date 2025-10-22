import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";
import { EnumTipoAccount } from "@enum";
import { capitalizeFirstLetter } from "@utils/utils";

interface ChipAccountBalanceProps {
  value: string;
}

const ChipMovementType: React.FunctionComponent<ChipAccountBalanceProps> = (
  props
) => {
  let bgColor;
  let fontColor;

  switch (props.value.toLowerCase()) {
    case EnumTipoAccount.PAGO.toLowerCase():
      bgColor = COLORS.green;
      fontColor = COLORS.black;
      break;
    case EnumTipoAccount.DEUDA.toLowerCase():
      bgColor = COLORS.red_light;
      fontColor = COLORS.red_dark;
      break;
    case EnumTipoAccount.FACTURADO.toLowerCase():
      bgColor = COLORS.red_light;
      fontColor = COLORS.red_dark;
      break;
    case EnumTipoAccount.NC.toLowerCase():
      bgColor = COLORS.blue_dark;
      fontColor = COLORS.white;
      break;
    default:
      bgColor = COLORS.grey;
      fontColor = COLORS.black;
  }

  return (
    <Box
      sx={{
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: bgColor,
        padding: "5px 10px",
        color: fontColor,
        width: "130px",
      }}
    >
      <Box display={"flex"}>{capitalizeFirstLetter(props.value)}</Box>
    </Box>
  );
};

export default ChipMovementType;
