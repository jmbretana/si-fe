import React from "react";
import IconButton from "@mui/material/IconButton";

interface IconButtonProps {
  disabled?: boolean;
  color: "success" | "error";
  icon: JSX.Element;
  //
  onClick: () => void;
}

/*
    iconButton: {
        color: "#fff !important",
        backgroundColor: '#198754 !important',
        '&:hover': {
            backgroundColor: '#157347 !important',
        },
    },
*/

const IconButtonUI: React.FunctionComponent<IconButtonProps> = (props) => {
  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <>
      {!props.disabled && (
        <IconButton onClick={onClickHandler} className={"iconButton"}>
          {props.icon}
        </IconButton>
      )}
    </>
  );
};

export default IconButtonUI;
