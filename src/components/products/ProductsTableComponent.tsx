import React from "react";
import { Box, IconButton, Switch } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Product } from "@interfaces";
import { useMemo } from "react";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";
import { formatMoney, formatTimestamp } from "@utils/utils";
import { TableComponent } from "@common";
import { COLORS } from "@values/colors";

interface TableProductsProps {
  data: Product[];
  //
  onEdit: (id: string) => void;
  onEditActive: (id: string, active: boolean) => void;
}

const ProductsTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const editActiveHandler = (id: string, active: boolean) => {
    props.onEditActive(id, active);
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "producto", //access nested data with dot notation
        header: "Producto",
        size: 300,
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },
      {
        accessorKey: "cantidad", //access nested data with dot notation
        header: "Presentacion",
        size: 140,
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },

      {
        accessorKey: "precio", //access nested data with dot notation
        header: "Precio",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box display={"flex"}>
            <Box sx={{ width: "20px" }}>$</Box>
            <Box sx={{ textAlign: "right", width: "90px" }}>
              {formatMoney(cell.getValue<number>())}
            </Box>
          </Box>
        ),
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },
      {
        accessorKey: "lista", //access nested data with dot notation
        header: "Lista",
        size: 50,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box
            component="span"
            sx={() => ({
              backgroundColor:
                cell.getValue<string>() === "A" ? "#D9D9D9" : COLORS.grey_300,
              borderRadius: "20px",
              color:
                cell.getValue<string>() === "A" ? COLORS.black : COLORS.blue,
              maxWidth: "9ch",
              padding: "4px 15px",
              display: "flex",
              justifyContent: "center",
            })}
          >
            {cell.getValue<string>()}
          </Box>
        ),
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },
      {
        accessorKey: "sublista", //access nested data with dot notation
        header: "Sublista",
        size: 50,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box
            component="span"
            sx={() => {
              return {
                backgroundColor: "#F9F9F9",
                borderRadius: "20px",
                color: COLORS.grey_dark,
                maxWidth: "9ch",
                padding: "2px 15px",
              };
            }}
          >
            {cell.getValue<string>()}
          </Box>
        ),
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "none", sm: "none", md: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },
      {
        accessorKey: "updated", //access nested data with dot notation
        header: "Actualizado",
        size: 70,
        enableSorting: false,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem", fontSize: "11px" }}>
            {cell.getValue<string>() !== undefined
              ? formatTimestamp(cell.getValue<string>())
              : ""}
          </Box>
        ),
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "none", sm: "none", md: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
      },
      {
        accessorKey: "deshabilitado", //access nested data with dot notation
        header: "Status",
        size: 50,
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => {
          const deshabilitado = cell.getValue<boolean>();
          return (
            <Box display={"flex"}>
              <Switch
                checked={!deshabilitado}
                onChange={() => {
                  editActiveHandler(
                    cell.row.original.id!,
                    cell.getValue<boolean>()
                  );
                }}
                color="secondary"
                inputProps={{ "aria-label": "controlled" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: cell.getValue<boolean>()
                    ? COLORS.white
                    : COLORS.green_dark,
                  borderRadius: "10px",
                  color: cell.getValue<boolean>() ? COLORS.black : COLORS.white,
                  padding: "0px 1px",
                  fontSize: "10px",
                  width: "50px",
                }}
              >
                {deshabilitado ? "Off" : "On"}
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "id",
        header: "Action",
        enableSorting: false,
        size: 30,
        muiTableBodyCellProps: {
          sx: {
            display: { xs: "table-cell" }, // Hide on mobile, show on larger screens
          },
        },
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar producto"
              onClick={() => editHandler(cell.getValue<string>())}
            >
              <EditIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <TableComponent columns={columns} data={props.data} />
    </>
  );
};

export default ProductsTableComponent;
