import React from "react";

import { Button } from "@common/button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { COLORS } from "@values/colors";

interface ButtonProps {
  //
  onClick?: () => void;
}

const ButtonGeneratePDF: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Button
        text="Generar PDF"
        startIcon={<PictureAsPdfIcon />}
        sx={{
          color: COLORS.black,
          backgroundColor: COLORS.grey_light,
          border: `1px solid ${COLORS.black}`,
          ":hover": {
            backgroundColor: COLORS.grey_light,
          },
        }}
        onClick={() => props.onClick && props.onClick()}
      />
    </ThemeProvider>
  );
};

export default ButtonGeneratePDF;
