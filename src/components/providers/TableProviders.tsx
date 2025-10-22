import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GetProviders } from "@actions/providersAction";
import { Provider } from "@interfaces";
import { PROVIDER_GETS_SUCCESS } from "src/middleware/types/ProviderActionTypes";
import Loading from "@common/Loading";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  type MRT_Cell,
  type MRT_Row,
} from "material-react-table";

import { TableComponent } from "@common";
import { COLORS } from "@values/colors";
import { capitalizeEachWord } from "@utils/utils";

interface TableProvidersProps {
  onEdit: (provider_id: string) => void;
}

const TableProviders: React.FunctionComponent<TableProvidersProps> = (
  props
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Provider[]>([]);
  let first = true;

  const dispatch = useDispatch<AppDispatch>();

  const { providers, status } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    if (first) {
      dispatch(GetProviders());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (status === PROVIDER_GETS_SUCCESS) {
      setData(providers as Provider[]);
      setLoading(false);
    }
  }, [providers]);

  const editHandler = (provider_id: string) => {
    props.onEdit(provider_id);
  };

  const columns = useMemo<MRT_ColumnDef<Provider>[]>(
    () => [
      {
        accessorKey: "proveedor", //access nested data with dot notation
        header: "Proveedor",
        size: 300,
        Cell: ({
          cell,
          row,
        }: {
          cell: MRT_Cell<Provider>;
          row: MRT_Row<Provider>;
        }) => (
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Chip
              icon={<StorefrontIcon sx={{ fontSize: "1.1rem" }} />}
              label={capitalizeEachWord(cell.getValue<string>())}
              variant="outlined"
              sx={{
                width: "250px",
                display: "flex",
                fontWeight: 400,
                justifyContent: "flex-start",
                color: COLORS.grey_dark,
                padding: "5px",
              }}
              //
              onClick={() => editHandler(row.original._id!)}
            />
          </Box>
        ),
      },
      {
        accessorKey: "_id",
        header: "Action",
        size: 50,

        Cell: ({ cell }: { cell: MRT_Cell<Provider> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar cliente"
              size="small"
              onClick={() => editHandler(cell.getValue<string>()!)}
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

export default TableProviders;
