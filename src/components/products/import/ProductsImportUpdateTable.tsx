import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";

import { COLORS } from "@values/colors";
import { TableComponent } from "@common";

interface TableProductsProps {
  data: ProductList[];
  //
}

export interface ProductList {
  id?: string;
  lista?: string;
  sublista?: string;
  cantidad?: string;
  producto: string;
  precio?: number;
  precioAnterior?: number;
  exist?: boolean;
}

const ProductsImportUpdateTable: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const columns = useMemo<MRT_ColumnDef<ProductList>[]>(
    () => [
      {
        accessorKey: "producto", //access nested data with dot notation
        header: "Producto",
        size: 300,
      },
      {
        accessorKey: "cantidad", //access nested data with dot notation
        header: "Presentacion",
        size: 150,
      },
      {
        accessorKey: "precioAnterior", //access nested data with dot notation
        header: "Precio Anterior",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<ProductList> }) => (
          <Box display={"flex"}>
            <Box sx={{ width: "20px" }}>$</Box>
            <Box sx={{ textAlign: "right", width: "90px" }}>
              {cell.getValue<number>()}
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: "precio", //access nested data with dot notation
        header: "Precio Nuevo",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<ProductList> }) => (
          <Box display={"flex"}>
            <Box sx={{ width: "20px" }}>$</Box>
            <Box sx={{ textAlign: "right", width: "90px" }}>
              {cell.getValue<number>()}
            </Box>
          </Box>
        ),
      },
      {
        header: "% de Aumento",
        accessorFn: (row) => {
          const precio = Number(row.precio!);
          const precioAnterior = Number(row.precioAnterior!);
          return ((precio - precioAnterior) / precioAnterior) * 100;
        },
        size: 50,
        Cell: ({ cell }: { cell: MRT_Cell<ProductList> }) => (
          <Box display={"flex"}>
            <Box
              component="span"
              sx={() => {
                const value = cell.getValue<number>();
                let backgroundColor;
                let color;
                if (value > 0) {
                  backgroundColor = COLORS.red;
                  color = COLORS.white;
                }

                if (value < 0) {
                  backgroundColor = COLORS.green_light;
                  color = COLORS.green_dark;
                }

                if (value === 0) {
                  backgroundColor = COLORS.white;
                  color = COLORS.grey_dark;
                }

                return {
                  backgroundColor,
                  borderRadius: "20px",
                  color: color,
                  maxWidth: "9ch",
                  margin: "3px 0",
                  padding: "2px 15px",
                };
              }}
            >
              {cell.getValue<number>().toFixed(2)}%
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: "sublista", //access nested data with dot notation
        header: "Sublista",
        size: 50,
        enableSorting: false,
        Cell: ({ cell }: { cell: MRT_Cell<ProductList> }) => (
          <Box
            component="span"
            sx={() => {
              const value = cell.getValue<string>();
              let backgroundColor;
              if (value === "UNIDAD") {
                backgroundColor = COLORS.grey_light;
              } else if (value === "BULTO") {
                backgroundColor = COLORS.orange_light;
              } else {
                backgroundColor = COLORS.white;
              }
              return {
                backgroundColor,
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

export default ProductsImportUpdateTable;
