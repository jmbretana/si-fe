import { COLORS } from "@values/colors";
import { Theme, Components } from "@mui/material/styles";

export const labelsCustomizations: Components<Theme> = {
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontWeight: 400, // Peso de la fuente
        color: COLORS.red, // Color del texto
        fontSize: "12px", // Tamaño de la fuente
        fontFamily: "Lexend, Arial, Helvetica, sans-serif", // Fuente
        marginBottom: 8,
        "&.Mui-focused": {
          color: COLORS.blue, // Color cuando está enfocado
        },
      },
    },
  },
};

export default labelsCustomizations;
