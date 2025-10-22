import React from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { COLORS } from "@values/colors";
import { useTheme } from "@mui/material";

interface TableComponentProps {
  columns: MRT_ColumnDef<any, any>[];
  data: MRT_TableOptions<any>["data"];
  //
}

const TableComponent: React.FunctionComponent<TableComponentProps> = (
  props
) => {
  const theme = useTheme();

  const table = useMaterialReactTable({
    columns: props.columns,
    data: props.data,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableHiding: false,

    initialState: {
      density: "compact",
      pagination: {
        pageIndex: 0, // Add the pageIndex property and set it to 0
        pageSize: 20, // Define la cantidad de registros por página
      },
    },

    muiTableContainerProps: {
      sx: {
        backgroundColor:
          theme.palette.mode === "dark" ? COLORS.black : COLORS.grey_light,
      },
    },
    muiTableProps: {
      sx: {
        overflow: "hidden",
        backgroundColor:
          theme.palette.mode === "dark" ? COLORS.grey_dark : COLORS.white,

        padding: "20px 5px",
        borderRadius: "20px",
        boxShadow: "none", // Quitar sombra
      },
    },

    muiTableHeadRowProps: {
      sx: {
        boxShadow: "none", // Quitar sombra
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: COLORS.grey,
        fontSize: "12px",
        padding: "16px",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        paddingTop: "5px",
        paddingBottom: "5px",
        fontSize: 13,
        backgroundColor: COLORS.white,
        border: "none",
        borderBottom: "1px solid #f0f0f0",
        color: COLORS.black,
      },
    },

    muiTopToolbarProps: {
      sx: {
        backgroundColor:
          theme.palette.mode === "dark" ? COLORS.black : COLORS.grey_light,
      },
    },
    muiBottomToolbarProps: {
      sx: {
        border: "none",
        backgroundColor:
          theme.palette.mode === "dark" ? COLORS.black : COLORS.grey_light,
        boxShadow: "none", // Quitar sombra
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none", // Quitar sombra
      },
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default TableComponent;
