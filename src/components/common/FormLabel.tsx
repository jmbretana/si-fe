import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";

interface BoxCardWhiteProps {
  children: React.ReactNode; // Permitir contenido arbitrario como hijos
}

const FormLabel: React.FunctionComponent<BoxCardWhiteProps> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        fontWeight: 400,
        color: COLORS.grey,
        fontSize: "14px",
        letterSpacing: "0.6px",
        paddingBottom: "5px",
      }}
    >
      {children}
    </Box>
  );
};

export default FormLabel;
