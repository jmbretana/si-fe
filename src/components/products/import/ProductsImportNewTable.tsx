import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";

import { COLORS } from "@values/colors";
import { ChipMoney, TableComponent } from "@common";

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

const ProductsImportNewTable: React.FunctionComponent<TableProductsProps> = (
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
        accessorKey: "precio", //access nested data with dot notation
        header: "Precio Nuevo",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<ProductList> }) => (
          <Box sx={{ margin: "4px 0" }}>
            <ChipMoney value={cell.getValue<number>()} />
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

export default ProductsImportNewTable;
