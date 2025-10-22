import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
    title: string,
    saving?: boolean,
    disabled?: boolean,
    color: "success" | "error"
    startIcon?: JSX.Element,
    variant: "contained" | "outlined"
    //

    onClick?: () => void,
}


const ButtonUI: React.FunctionComponent<ButtonProps> = (props) => {
    const onClickHandler = () => {
        props.onClick && props.onClick();
    }

    const loadingView = (
        <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
    );

    return (
        <Button
            type="button"
            variant={props.variant}
            color={props.color}
            disabled={props.disabled}
            startIcon={props.startIcon}
            //
            onClick={onClickHandler}
        >
            {!props.saving && props.title}
            {props.saving && loadingView}
        </Button>
    );
}

export default ButtonUI;
