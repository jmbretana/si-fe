import React from "react";

import ButtonComponent from "./Button";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { COLORS } from "@values/colors";

interface ButtonProps {
  //
  onClick: () => void;
}

const ButtonFacturar: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<PointOfSaleIcon />}
      text={"Facturar"}
      sx={{
        backgroundColor: COLORS.blue,
        "&:hover": {
          backgroundColor: COLORS.blue_dark,
        },
      }}
      //
      onClick={() => props.onClick()}
    />
  );
};

export default ButtonFacturar;
