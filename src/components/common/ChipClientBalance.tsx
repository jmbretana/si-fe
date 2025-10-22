import React, { useEffect, useState } from "react";
import { Box, FormLabel } from "@mui/material";
import { COLORS } from "@values/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";
import { GetAllClientAccounts } from "@actions/accountsActions";
import { ACCOUNT_GETBYCLIENT_SUCCESS } from "@types/AccountActionTypes";
import { Account, Client } from "@interfaces";

interface ChipMoneyProps {
  client: Client | undefined;
}

const ChipClientBalance: React.FunctionComponent<ChipMoneyProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<Account[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const { accounts, statusAccount } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    if (props.client !== undefined && props.client.client_id !== undefined) {
      dispatch(GetAllClientAccounts(props.client.client_id.toString()));
    }

    if (props.client === undefined) {
      setData([]);
      setBalance(0);
    }
  }, [props.client]);

  useEffect(() => {
    if (statusAccount === ACCOUNT_GETBYCLIENT_SUCCESS) {
      setData(accounts as Account[]);
      setBalance(props.client?.balance || 0);
    }
  }, [accounts]);

  const viewBalance = (
    <>
      <FormLabel sx={{ fontWeight: 500, color: COLORS.black }}>
        {" "}
        Saldo:
      </FormLabel>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          borderRadius: "20px",
          padding: "10px 15px",
          fontWeight: 400,
          fontFamily: "Lexend",
          width: "150px",
          textAlign: "center",
          backgroundColor: balance > 0 ? COLORS.green : COLORS.red,
          color: balance > 0 ? COLORS.green_dark : COLORS.white,
        }}
      >
        <Box>$</Box>
        <Box>{balance.toFixed(2)}</Box>
      </Box>
    </>
  );

  return data.length > 0 && viewBalance;
};

export default ChipClientBalance;
