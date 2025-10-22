import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, PaletteMode } from "@mui/material/styles";
import { getDesignTokens } from "./themePrimitives";
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  navigationCustomizations,
  //surfacesCustomizations,
} from "./customization";

export default function getSignUpTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...navigationCustomizations,
      //...surfacesCustomizations,
    },
  };
}
