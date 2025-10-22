import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

import { GetAllByDayBudgets } from "@actions/budgetsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { formatMoney } from "@utils/utils";
import { BudgetCaja } from "@interfaces";

export default function SessionsChart() {
  const theme = useTheme();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son 0-indexados
  const currentYear = currentDate.getFullYear();

  const data = getDaysInMonth(currentMonth, currentYear);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetAllByDayBudgets({}));
  }, []);

  const budgetsCaja = useSelector(
    (state: RootState) => state.budgets.budgetsCaja
  ) as BudgetCaja[];

  function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
      <defs>
        <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.5} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    );
  }

  function getDaysInMonth(month: number, year: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month - 1, i);
      const formattedDate = currentDate.toISOString().split("T")[0]; // Formato yyyy-mm-dd
      days.push(formattedDate);
    }

    return days;
  }

  let sumTotalBudget = 0;
  try {
    sumTotalBudget = budgetsCaja.reduce(
      (budgets: any, budget: any) => budgets + budget.total,
      0
    );
  } catch (error) {
    console.error("Error:", error);
  }

  const accumulatedBudgets: {
    [key: string]: { subtotalA: number; subtotalV: number; total: number };
  } = {};

  data.forEach((date: string) => {
    if (!accumulatedBudgets[date]) {
      accumulatedBudgets[date] = { subtotalA: 0, subtotalV: 0, total: 0 };
    }
  });

  try {
    budgetsCaja.forEach((budget: any) => {
      const date = budget.fecha;
      if (!accumulatedBudgets[date]) {
        accumulatedBudgets[date] = { subtotalA: 0, subtotalV: 0, total: 0 };
      }
      accumulatedBudgets[date].subtotalA += budget.subtotalA;
      accumulatedBudgets[date].subtotalV += budget.subtotalV;
      accumulatedBudgets[date].total += budget.total;
    });
  } catch (error) {
    console.error("Error:", error);
  }

  const accumulatedBudgetArray = Object.keys(accumulatedBudgets).map(
    (date) => ({
      date: date,
      subtotalA: accumulatedBudgets[date].subtotalA,
      subtotalV: accumulatedBudgets[date].subtotalV,
      total: accumulatedBudgets[date].total,
    })
  );

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", borderRadius: "20px" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Presupuestos
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              $ {formatMoney(sumTotalBudget)}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total de presupuestos del mes
          </Typography>
        </Stack>
        <LineChart
          dataset={accumulatedBudgetArray}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "date",
            },
          ]}
          series={[
            {
              dataKey: "total",
              label: "Total",
              type: "line",
              area: true,
              showMark: false,
            },
            {
              dataKey: "subtotalA",
              label: "Subtotal A",
              type: "line",
              area: true,
              showMark: false,
            },
            {
              dataKey: "subtotalV",
              label: "Subtotal V",
              type: "line",
              area: true,
              showMark: false,
            },
          ]}
          height={250}
          margin={{ left: 100, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-subtotalA": {
              fill: "url('#subtotalA')",
            },
            "& .MuiAreaElement-series-subtotalV": {
              fill: "url('#subtotalV')",
            },
            "& .MuiAreaElement-series-total": {
              fill: "url('#total')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="total" />
          <AreaGradient color={theme.palette.primary.main} id="subtotalV" />
          <AreaGradient color={theme.palette.primary.light} id="subtotalA" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
