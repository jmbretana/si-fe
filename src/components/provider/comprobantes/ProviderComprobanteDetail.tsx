import React from "react";
import { COLORS } from "@values/colors";
import { styled } from "@mui/system";
import { Box, Typography, IconButton } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { formatMoney } from "@utils/utils";

import { ComprobanteProvider, Provider } from "@interfaces";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Table,
  TableCell,
  tableCellClasses,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface ProviderAccountProps {
  provider: Provider;
  loading: boolean;
  accounts: ComprobanteProvider[] | [];
  //
  onRemoveMovement: (row: ComprobanteProvider) => void;
  onEditMovement: (row: ComprobanteProvider) => void;
  onSearchBudget?: (budgetId: number) => void;
}

//

// styles
const useStyles = makeStyles(() =>
  createStyles({
    boxContainer: {
      padding: "20px",
      borderRadius: "20px",
      border: "2px solid " + COLORS.grey_light,
      background: COLORS.white,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    boxPDF: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
    },

    aLink: {
      marginRight: "10px",
      color: COLORS.grey,
      paddingTop: "7px",
    },
  })
);

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLORS.white,
    color: COLORS.grey,
    fontSize: "12px",
    padding: "16px",
    fontWeight: "normal",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.MuiTableRow-root`]: {
    fontSize: 14,
  },
}));

const ProviderComprobanteDetail: React.FunctionComponent<
  ProviderAccountProps
> = (props) => {
  const classes = useStyles();

  const sortedAccounts: ComprobanteProvider[] = [...props.accounts];
  const removeMovement = (row: ComprobanteProvider) => {
    props.onRemoveMovement(row);
  };

  const editMovement = (row: ComprobanteProvider) => {
    props.onEditMovement(row);
  };

  const tableView = () => {
    return (
      <TableContainer
        sx={{
          background: COLORS.white,
        }}
      >
        <Table sx={{ width: "100%" }} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width={20}>
                ID
              </StyledTableCell>
              <StyledTableCell align="center" width={20}>
                Comprobante
              </StyledTableCell>
              <StyledTableCell align="center" width={20}>
                Fecha
              </StyledTableCell>
              <StyledTableCell align="center" width={60}>
                Tipo
              </StyledTableCell>
              <StyledTableCell align="center" width={60}>
                Monto
              </StyledTableCell>
              <StyledTableCell align="center" width={50}>
                Comentarios{" "}
              </StyledTableCell>
              <StyledTableCell align="center" width={50}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAccounts.map((comprobante: ComprobanteProvider) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  color: COLORS.grey_dark,
                  "&:hover": {
                    background: COLORS.grey_light,
                  },
                }}
                key={comprobante.comprobante_id}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    color: COLORS.grey_dark,
                  }}
                >
                  {comprobante.comprobante_id}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    color: COLORS.grey_dark,
                  }}
                >
                  {comprobante.nro_comprobante}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    color: COLORS.grey_dark,
                  }}
                >
                  {comprobante.fecha}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: COLORS.grey_dark,
                    textAlign: "center",
                  }}
                >
                  {comprobante.tipo}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 400,
                    color: COLORS.grey_dark,
                    width: "120px",
                  }}
                >
                  $ {formatMoney(comprobante.monto)}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 400,
                    color: COLORS.grey_dark,
                    fontSize: "12px",
                  }}
                >
                  {comprobante.comentarios}
                </TableCell>
                <TableCell sx={{ width: "110px" }}>
                  <IconButton
                    color="secondary"
                    aria-label="edit"
                    onClick={() => editMovement(comprobante)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => removeMovement(comprobante)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // TODO: Create specific PDF component for providers
  const pdfView = (
    <div style={{ display: "none" }}>
      {/* PDF functionality to be implemented for providers */}
    </div>
  );

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {!props.loading && (
        <>
          <Box className={classes.boxPDF}>{pdfView}</Box>
          <Box className={classes.boxContainer}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: COLORS.grey_dark,
                  fontFamily: "Bagoss, Arial, Helvetica, sans-serif",
                  fontWeight: 400,
                  fontSize: "22px",
                  lineHeight: "40px",
                }}
              >
                {" "}
                Listado de Comprobantes
              </Typography>
            </Box>

            {tableView()}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProviderComprobanteDetail;
