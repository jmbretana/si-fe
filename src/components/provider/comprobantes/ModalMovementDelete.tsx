import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonComponent } from "@common";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { ComprobanteProvider } from "@interfaces";

interface ButtonProps {
  open: boolean;
  comprobante?: ComprobanteProvider;
  //
  onConfirm: (id: string) => void;
  onClose: () => void;
}

const ModalMovementDelete: React.FunctionComponent<ButtonProps> = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleConfirm = () => {
    if (props.comprobante) {
      props.onConfirm(props.comprobante!.comprobante_id!.toString());
    }
  };

  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Dar de Baja ?"}</DialogTitle>
      <DialogContent sx={{ padding: "20px" }}>
        <Box id="alert-dialog-slide-description">
          <Box mb={2}>
            Confirmo que quiero dar de baja el comprobante:{" "}
            <strong>{props.comprobante?.comprobante_id}</strong>
          </Box>
          <Box pt={2} display={"flex"} justifyContent={"space-between"}>
            <Box>Fecha: </Box>
            <Box>{props.comprobante?.fecha}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>Monto: </Box>
            <Box>$ {props.comprobante?.monto}</Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          startIcon={<DeleteIcon />}
          text="Dar de baja"
          onClick={() => handleConfirm()}
          color="error"
          variant="outlined"
          //
          sx={{
            border: "transparent",
            borderRadius: "20px",
            padding: "5px 20px",
          }}
        />{" "}
        <ButtonComponent
          text="Cancelar"
          color="secondary"
          onClick={() => handleClose()}
          sx={{
            marginRight: "10px",
            borderRadius: "20px",
            padding: "5px 20px",
          }}
        />{" "}
      </DialogActions>
    </Dialog>
  );
};

export default ModalMovementDelete;
