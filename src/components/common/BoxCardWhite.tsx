import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";

interface BoxCardWhiteProps {
  children: React.ReactNode; // Permitir contenido arbitrario como hijos
}

const BoxCardWhite: React.FunctionComponent<BoxCardWhiteProps> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        background: COLORS.white,
        padding: "30px 20px",
        borderRadius: "20px",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxCardWhite;
