import React from "react";

import ButtonComponent from "./Button";
import AddIcon from "@mui/icons-material/Add";

interface ButtonProps {
  title: string;
  type?: "submit" | undefined;
  //
  onClick?: () => void;
}

const ButtonAdd: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<AddIcon />}
      text={props.title}
      type={props.type ? props.type : undefined}
      //
      onClick={() => props.onClick && props.onClick()}
    />
  );
};

export default ButtonAdd;
