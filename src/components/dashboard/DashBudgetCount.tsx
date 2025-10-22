import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@common/Loading";

import { BUDGET_GETALL_COUNT_SUCCESS } from "src/middleware/types/BudgetActionTypes";
import { GetAllCount } from "@actions/budgetsActions";

const CardBudgetCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const count = useSelector((state: RootState) => state.budgets.count);
  const budgetStatus = useSelector(
    (state: RootState) => state.budgets.budgetStatus
  );
  const loading = useSelector((state: RootState) => state.budgets.isLoading);

  const [countBudgets, setCountBudgets] = useState(0);
  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetAllCount());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (budgetStatus === BUDGET_GETALL_COUNT_SUCCESS) {
      setCountBudgets(Number(count));
    }
  }, [budgetStatus]);

  //

  const handleClick = () => {
    navigate("/presupuestos");
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total presupuestos
        </Typography>
        {loading && <Loading />}
        {!loading && (
          <Typography component="h1" variant="h1" gutterBottom>
            {countBudgets}
          </Typography>
        )}
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardBudgetCount;
