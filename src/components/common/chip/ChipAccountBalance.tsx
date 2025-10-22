import React from "react";
import { Box } from "@mui/material";
import { formatMoney, roundBalance } from "@utils/utils";
import { COLORS } from "@values/colors";

interface ChipAccountBalanceProps {
  outline?: boolean;
  value: number | undefined;
}

const ChipAccountBalance: React.FunctionComponent<ChipAccountBalanceProps> = (
  props
) => {
  let value = props.value || 0;

  if (Number(value.toFixed(2)) === 0) {
    value = 0;
  }

  value = roundBalance(value);

  let bgColor;
  let fontColor;

  if (value === 0) {
    bgColor = COLORS.white;
    fontColor = COLORS.black;
  }
  if (value < 0) {
    bgColor = COLORS.red_light;
    fontColor = COLORS.red_dark;
  }
  if (value > 0) {
    bgColor = COLORS.green;
    fontColor = COLORS.black;
  }

  return (
    <Box
      sx={{
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: bgColor,
        padding: "5px 10px",
        color: fontColor,
        width: "170px",
      }}
    >
      <Box display={"flex"}>$</Box>
      <Box display={"flex"}>{formatMoney(value)}</Box>
    </Box>
  );
};

export default ChipAccountBalance;
