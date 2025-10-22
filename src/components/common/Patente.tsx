import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@values/colors";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { makeStyles, createStyles } from "@mui/styles";
import clsx from "clsx";
import { EnumPatentes } from "@interfaces/enum";

interface PatenteProps {
  value: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    patenteBox: {
      padding: "5px",
      border: "2px solid #000",
      borderRadius: "10px",
    },
    patente6: {
      backgroundColor: COLORS.black,
      color: COLORS.white,
      border: "2px solid #FFF",
    },

    patente7: {
      backgroundColor: COLORS.white,
      color: COLORS.black,
      border: "2px solid #000",
    },

    retira: {
      backgroundColor: COLORS.grey_light,
      color: COLORS.blue_dark,
      border: "2px solid " + COLORS.blue_dark,
    },
  })
);

const Patente: React.FunctionComponent<PatenteProps> = (props) => {
  const classes = useStyles();

  const showPatente7 =
    props.value.length === 7 && props.value !== EnumPatentes.RETIRA;

  const controlPatente = (patente: string) => {
    if (patente === EnumPatentes.RETIRA) {
      return EnumPatentes.RETIRA;
    }

    if (patente.length === 7) {
      return `${patente.slice(0, 2)} ${patente.slice(2, 5)}
  ${patente.slice(5, 7)}`;
    }

    if (patente.length === 6) {
      return `${patente.slice(0, 3)} ${patente.slice(3, 6)}`;
    }
  };

  const patente = (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignContent={"center"}
      alignItems={"center"}
      gap={1}
    >
      <LocalShippingIcon />

      <Box
        className={clsx(
          { [classes.patente6]: !showPatente7 },
          { [classes.patente7]: showPatente7 },
          { [classes.retira]: props.value === EnumPatentes.RETIRA },
          classes.patenteBox
        )}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {controlPatente(props.value)}
        </Typography>
      </Box>
    </Box>
  );

  return <>{patente}</>;
};

export default Patente;
