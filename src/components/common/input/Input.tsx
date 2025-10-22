import React from "react";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";

interface ButtonProps {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  sx?: object;
  //
  onChange?: (value: string) => void;
}

const InputComponent: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <TextField
        fullWidth
        id={props.id}
        label={props.label}
        name={props.name}
        required={props.required ? props.required : false}
        size="small"
        value={props.value}
        variant="outlined"
        sx={props.sx}
        //
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default InputComponent;
