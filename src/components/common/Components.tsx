import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

export const FormGridColumn = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

export const FormGridRow = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  gap: "20px",
}));
