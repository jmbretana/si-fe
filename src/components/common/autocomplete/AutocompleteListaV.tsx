import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { COLORS } from "@values/colors";

interface ButtonProps {
  value?: string;
  all: boolean;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  {
    id: 1,
    name: "BULTO",
  },
  {
    id: 2,
    name: "UNIDAD",
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteListaV: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 1,
    name: "B",
  });

  const filterListaVHandler = (value: ListItem) => {
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
        sx={{ background: COLORS.white, marginRight: "10px", width: 200 }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="Lista V" />}
        size="small"
        onChange={(event, value) => filterListaVHandler(value!)}
        value={
          valueSelect
            ? valueSelect
            : {
                id: 0,
                name: "",
              }
        }
      />
    </ThemeProvider>
  );
};

export default AutocompleteListaV;
