import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, PaletteMode } from "@mui/material/styles";
import { getDesignTokens } from "./themePrimitives";
import {
  buttonCustomizations,
  inputsCustomizations,
  labelsCustomizations,
} from "./customization";

export default function getSignUpTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...buttonCustomizations,
      ...labelsCustomizations,
      ...inputsCustomizations,
    },
  };
}
