import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  {
    id: 1,
    name: "Devolución",
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteTipoNC: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const defaultItem: ListItem = {
    id: 1,
    name: "Devolución",
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
        renderInput={(params) => <TextField {...params} label="Tipo" />}
        size="small"
        onChange={(event, value) => filterHandler(value!)}
        value={valueSelect ? valueSelect : defaultItem}
      />
    </ThemeProvider>
  );
};

export default AutocompleteTipoNC;
