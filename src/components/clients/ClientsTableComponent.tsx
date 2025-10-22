import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GetAllClients } from "@actions/clientsActions";
import { Client } from "@interfaces";
import { CLIENT_GETALL_SUCCESS } from "src/middleware/types/ClientActionTypes";
import Loading from "@common/Loading";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  type MRT_Cell,
  type MRT_Row,
} from "material-react-table";

import { TableComponent } from "@common";
import { COLORS } from "@values/colors";
import { formatPhoneNumber, capitalizeEachWord } from "@utils/utils";
interface TableClientsProps {
  onEdit: (client_id: number) => void;
}

const TableClients: React.FunctionComponent<TableClientsProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Client[]>([]);
  let first = true;

  const dispatch = useDispatch<AppDispatch>();

  const { clients, status } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (first) {
      dispatch(GetAllClients());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (status === CLIENT_GETALL_SUCCESS) {
      setData(clients as Client[]);
      setLoading(false);
    }
  }, [clients]);

  const editHandler = (client_id: number) => {
    props.onEdit(client_id);
  };

  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "cliente", //access nested data with dot notation
        header: "Cliente",
        size: 300,
        Cell: ({
          cell,
          row,
        }: {
          cell: MRT_Cell<Client>;
          row: MRT_Row<Client>;
        }) => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Chip
              icon={<AccountCircleIcon />}
              label={capitalizeEachWord(cell.getValue<string>())}
              variant="outlined"
              sx={{
                width: "250px",
                overflow: "hidden",
                display: "flex",
                fontWeight: 400,
                justifyContent: "flex-start",
                color: COLORS.grey_dark,
              }}
              //
              onClick={() => editHandler(row.original.client_id)}
            />
          </Box>
        ),
      },
      {
        accessorKey: "domicilio", //access nested data with dot notation
        header: "Domicilio",
        size: 300,
        Cell: ({ cell }: { cell: MRT_Cell<Client> }) => (
          <Box component="span" sx={{ textAlign: "center" }}>
            {capitalizeEachWord(cell.getValue<string>())}
          </Box>
        ),
      },
      {
        accessorKey: "telefono", //access nested data with dot notation
        header: "Telefono",
        size: 50,
        align: "center",
        Cell: ({ cell }: { cell: MRT_Cell<Client> }) => (
          <Box component="span" sx={{ textAlign: "center" }}>
            {formatPhoneNumber(cell.getValue<string>())}
          </Box>
        ),
      },
      {
        accessorKey: "lista_a", //access nested data with dot notation
        header: "Lista A",
        size: 50,
      },
      {
        accessorKey: "lista_v", //access nested data with dot notation
        header: "Lista V",
        size: 50,

        Cell: ({ cell }: { cell: MRT_Cell<Client> }) => (
          <Box
            component="span"
            sx={() => {
              const value = cell.getValue<string>();
              let border;
              let color;
              if (value === "UNIDAD") {
                border = "1px solid " + COLORS.grey;
                color = COLORS.grey;
              } else if (value === "BULTO") {
                border = "1px solid " + COLORS.blue_dark;
                color = COLORS.blue_dark;
              } else {
                border = "1px solid " + COLORS.white;
              }
              return {
                border,
                borderRadius: "20px",
                color,
                width: "80px",
                padding: "1px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              };
            }}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
      {
        accessorKey: "client_id",
        header: "Action",
        size: 50,

        Cell: ({ cell }: { cell: MRT_Cell<Client> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar cliente"
              size="small"
              onClick={() => editHandler(Number(cell.getValue<string>()))}
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
      {loading && <Loading />}
      {!loading && <TableComponent columns={columns} data={data} />}
    </>
  );
};

export default TableClients;
