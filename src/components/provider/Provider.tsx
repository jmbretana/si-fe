import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PROVIDER_GET_SUCCESS } from "src/middleware/types/ProviderActionTypes";
import ProviderInfo from "./ProviderInfo";
import { ButtonBack } from "@common/button";
import { TittleHeader } from "@common";
import { GetProvider } from "@actions/providersAction";
import { AppDispatch, RootState } from "src/middleware/store/store";

import ProviderBalance from "./balance";
import ProviderComprobantes from "./comprobantes";
//

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Provider: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [previousLocation, setPreviousLocation] = useState<string | null>(null);

  const { provider, status } = useSelector(
    (state: RootState) => state.providers
  );

  let first = true;

  useEffect(() => {
    if (id !== "new" && first) {
      first = false;
      setEdit(true);
      dispatch(GetProvider(id!));
    } else {
      setLoading(false);
    }

    const previousUrl = localStorage.getItem("previousUrl");
    setPreviousLocation(previousUrl);
  }, []);

  useEffect(() => {
    if (status === PROVIDER_GET_SUCCESS && provider) {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      switch (hash) {
        case "#info":
          setValue(0);
          break;
        case "#balance":
          setValue(1);
          break;
        default:
          setValue(0);
      }
    }
  }, [location.hash]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const cancelHandler = () => {
    if (previousLocation && !previousLocation.includes("/proveedor/")) {
      navigate(previousLocation);
    } else {
      navigate("/proveedores");
    }
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box mt={2}>{children}</Box>}
      </div>
    );
  }

  function tabSelection(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        paddingBottom={2}
        alignContent={"center"}
        alignItems={"center"}
      >
        <TittleHeader
          title={
            id === "new"
              ? "Agregar Proveedor"
              : provider
              ? provider.proveedor
              : ""
          }
        />

        <Box display={"flex"} gap={2}>
          {" "}
          <ButtonBack
            //
            onClick={() => cancelHandler()}
          />
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Info" {...tabSelection(0)} />
            <Tab label="Comprobantes" {...tabSelection(1)} />
            <Tab label="Cta. Corriente" {...tabSelection(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {!loading && (
            <ProviderInfo
              proveedor={edit ? provider : undefined}
              loading={loading}
              //
              onCancel={() => cancelHandler()}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {provider && (
            <ProviderComprobantes
              provider={provider}
              onRefreshSaldo={() => {}}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {provider && (
            <ProviderBalance provider={provider} onRefreshSaldo={() => {}} />
          )}
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Provider;
