import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
//
import { GetProviders } from "@actions/providersAction";
import { Provider } from "@interfaces";

interface AutocompleProviderProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const AutocompleteProveedores: React.FunctionComponent<
  AutocompleProviderProps
> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { providers } = useSelector((state: RootState) => state.providers);
  const [providerSelect, setProviderSelect] = useState<Provider>();

  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetProviders());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (providers !== undefined && props.value !== undefined) {
      const value = Array.isArray(providers)
        ? providers.find((item) => item.proveedor === props.value)
        : undefined;
      setProviderSelect(value!);
    }
  }, [providers]);

  useEffect(() => {
    props.onSelect(providerSelect ? providerSelect.proveedor : "");
  }, [providerSelect]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        fullWidth
        disablePortal
        sx={{ width: 200 }}
        options={Array.isArray(providers) ? providers : []}
        getOptionLabel={(option: any) => option.proveedor || ""}
        renderInput={(params) => <TextField {...params} label="Proveedor" />}
        size="small"
        value={providerSelect ? providerSelect : {}}
        //
        onChange={(event, value) =>
          setProviderSelect(value ? value : undefined)
        }
      />
    </ThemeProvider>
  );
};

export default AutocompleteProveedores;
