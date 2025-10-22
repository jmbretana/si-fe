import React from "react";
import { COLORS } from "@values/colors";
import { Box, Typography } from "@mui/material";
import { ButtonComponent, ButtonBack, ButtonAdd } from "@common";
import { useThemeContext } from "@common/ThemeContext";

//
import RefreshIcon from "@mui/icons-material/Refresh";
//

interface TittleHeaderProps {
  icon?: React.ReactNode;
  title: string;
  //
  onAdd?: () => void;
  onCancel?: () => void;
  onRefresh?: () => void;
}

const TittleHeader: React.FunctionComponent<TittleHeaderProps> = (props) => {
  const { theme } = useThemeContext(); // Obtener el tema actual

  const handleAdd = () => {
    props.onAdd!();
  };

  const handleCancel = () => {
    props.onCancel!();
  };

  const handleRefresh = () => {
    props.onRefresh!();
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"} paddingBottom={2}>
      <Box display={"flex"}>
        <Typography
          sx={{
            color:
              theme.palette.mode === "dark" ? COLORS.white : COLORS.grey_dark,
          }}
          variant="h3"
          fontFamily={"Lexend, Arial, Helvetica, sans-serif"}
        >
          {" "}
          {props.title}
        </Typography>
      </Box>

      <Box gap={1} display={"flex"}>
        {props.onCancel && <ButtonBack onClick={() => handleCancel()} />}

        {props.onRefresh && (
          <ButtonComponent
            text="Refrescar"
            startIcon={<RefreshIcon />}
            sx={{
              backgroundColor: COLORS.grey_light,
              border: "1px solid " + COLORS.blue,
              color: COLORS.blue,
              ":hover": {
                backgroundColor: COLORS.blue,
                color: COLORS.white,
              },
            }}
            //
            onClick={() => handleRefresh()}
          />
        )}

        {props.onAdd && (
          <ButtonAdd title="Agregar" onClick={() => handleAdd()} />
        )}
      </Box>
    </Box>
  );
};

export default TittleHeader;
