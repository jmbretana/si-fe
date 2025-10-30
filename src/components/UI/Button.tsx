import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  title: string;
  saving?: boolean;
  disabled?: boolean;
  color: 'success' | 'error';
  startIcon?: React.ReactNode;
  variant: 'contained' | 'outlined';
  //

  onClick?: () => void;
}

const ButtonUI: React.FunctionComponent<ButtonProps> = (props) => {
  const onClickHandler = () => {
    props.onClick && props.onClick();
  };

  return (
    <Button
      type="button"
      variant={props.variant}
      color={props.color}
      disabled={props.disabled}
      startIcon={props.startIcon}
      loading={props.saving}
      loadingPosition="center"
      //
      onClick={onClickHandler}
    >
      {props.title}
    </Button>
  );
};

export default ButtonUI;
