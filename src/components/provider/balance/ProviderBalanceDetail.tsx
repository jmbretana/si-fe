import React from "react";
import { COLORS } from "@values/colors";
import { styled } from "@mui/system";
import { Box, Typography, IconButton } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { ChipAccountBalance } from "@components/common/chip";
import { formatMoney } from "@utils/utils";

import { AccountProvider, Provider } from "@interfaces";

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
  accounts: AccountProvider[] | [];
  //
  onRemoveMovement: (row: AccountProvider) => void;
  onEditMovement: (row: AccountProvider) => void;
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

const ProviderBalanceDetail: React.FunctionComponent<ProviderAccountProps> = (
  props
) => {
  const classes = useStyles();

  const sortedAccounts: AccountProvider[] = [...props.accounts].sort(
    (a, b) => b.asiento_id! - a.asiento_id!
  );

  const removeMovement = (row: AccountProvider) => {
    props.onRemoveMovement(row);
  };

  const editMovement = (row: AccountProvider) => {
    props.onEditMovement(row);
  };

  // Calculate provider balance from accounts
  const providerBalance = sortedAccounts.reduce((total, account) => {
    return total + (account.saldo || 0);
  }, 0);

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
                Fecha
              </StyledTableCell>
              <StyledTableCell align="center" width={60}>
                Forma de Pago
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
            {sortedAccounts.map((account: AccountProvider) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  color: COLORS.grey_dark,
                  "&:hover": {
                    background: COLORS.grey_light,
                  },
                }}
                key={account.asiento_id}
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
                  {account.asiento_id}
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
                  {account.fecha}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: COLORS.grey_dark,
                    textAlign: "center",
                  }}
                >
                  {account.tipoPago}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 400,
                    color: COLORS.grey_dark,
                    width: "120px",
                  }}
                >
                  $ {formatMoney(account.saldo)}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 400,
                    color: COLORS.grey_dark,
                    fontSize: "12px",
                  }}
                >
                  {account.comentarios}
                </TableCell>
                <TableCell sx={{ width: "110px" }}>
                  <IconButton
                    color="secondary"
                    aria-label="edit"
                    onClick={() => editMovement(account)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => removeMovement(account)}
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
                Balance
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Typography
                  sx={{
                    color: COLORS.grey_dark,
                    fontFamily: "Bagoss, Arial, Helvetica, sans-serif",
                    fontWeight: 100,
                    fontSize: "18px",
                    lineHeight: "40px",
                  }}
                  variant="h5"
                >
                  Saldo:
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.grey_dark,
                    fontFamily: "Bagoss, Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "40px",
                  }}
                  variant="h5"
                >
                  <ChipAccountBalance value={providerBalance} />
                </Typography>
              </Box>
            </Box>

            {tableView()}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProviderBalanceDetail;
