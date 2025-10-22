import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";
import { EnumTipoPago } from "@interfaces/enum";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  {
    id: 0,
    name: "",
  },
  {
    id: 4,
    name: EnumTipoPago.CAJAS,
  },
  {
    id: 1,
    name: EnumTipoPago.CHEQUE,
  },
  {
    id: 2,
    name: EnumTipoPago.EFECTIVO,
  },
  {
    id: 3,
    name: EnumTipoPago.TRANSFERENCIA,
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteTipoCuenta: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const defaultItem: ListItem = {
    id: 0,
    name: "",
  };

  const [valueSelect, setValueSelect] = useState<ListItem>(defaultItem);

  const filterHandler = (value: ListItem) => {
    props.onSelect(value.name);
    setValueSelect(value);
  };

  useEffect(() => {
    if (props.value !== undefined) {
      const value = list.find((item) => item.name === props.value);
      setValueSelect(value!);
    }
  }, [props.value]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={list}
        sx={{ background: COLORS.white, marginRight: "10px", width: 300 }}
        getOptionLabel={(option: ListItem) => option.name}
        // quiero que el label del text field aparezca mas arriba con padding
        renderInput={(params) => <TextField {...params} label="Tipo pago" />}
        size="small"
        onChange={(event, value) => filterHandler(value!)}
        value={valueSelect ? valueSelect : defaultItem}

        // sumar si detecto error
      />
    </ThemeProvider>
  );
};

export default AutocompleteTipoCuenta;
