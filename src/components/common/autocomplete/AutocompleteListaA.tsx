import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
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
    name: "B",
  },
  {
    id: 2,
    name: "BTO",
  },
  {
    id: 3,
    name: "ESP",
  },
  {
    id: 4,
    name: "GRAL",
  },
  {
    id: 5,
    name: "SILVIO",
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteListaA: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 1,
    name: "B",
  });

  const filterListaAHandler = (value: ListItem) => {
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
        renderInput={(params) => <TextField {...params} label="Lista A" />}
        size="small"
        onChange={(event, value) => filterListaAHandler(value!)}
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

export default AutocompleteListaA;
