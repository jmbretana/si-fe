import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonComponent, ButtonSave } from "@common";
import { Input, InputDate, InputNumber } from "@common/input";
import { Box } from "@mui/material";
import { ComprobanteProvider } from "@interfaces";

interface ButtonProps {
  open: boolean;
  comprobante?: ComprobanteProvider;
  //
  onConfirm: (comprobante: ComprobanteProvider) => void;
  onClose: () => void;
}

const ModalMovementEdit: React.FunctionComponent<ButtonProps> = (props) => {
  const [comprobante, setComprobante] = React.useState<
    ComprobanteProvider | undefined
  >(props.comprobante);

  // Actualizar el estado local cuando cambie la prop comprobante
  useEffect(() => {
    setComprobante(props.comprobante);
  }, [props.comprobante]);

  const handleClose = () => {
    props.onClose();
  };

  const handleConfirm = () => {
    props.onConfirm(comprobante!);
  };

  const handleChangeSaldo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (comprobante) {
      setComprobante({ ...comprobante, monto: value });
    }
  };

  const handleChangeComentarios = (value: string) => {
    if (comprobante) {
      setComprobante({ ...comprobante, comentarios: value });
    }
  };

  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          width: "600px",
        }}
      >
        <DialogTitle>{"Editar asiento"}</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          <Box id="alert-dialog-slide-description">
            <Box pt={2} display={"flex"} justifyContent={"space-between"}>
              <Box>Fecha: </Box>
              <Box>
                <InputDate
                  value={comprobante?.fecha || ""}
                  onChange={(value) => {
                    if (comprobante) {
                      setComprobante({ ...comprobante, fecha: value });
                    }
                  }}
                />
              </Box>
            </Box>
            <Box pt={2} display={"flex"} justifyContent={"space-between"}>
              <Box>Monto: </Box>
              <Box>
                <InputNumber
                  id="monto"
                  name="monto"
                  label=""
                  value={comprobante?.monto || 0}
                  large={true}
                  onChange={(e) => handleChangeSaldo(e)}
                />
              </Box>
            </Box>
            <Box pt={2} display={"flex"} justifyContent={"space-between"}>
              <Box>Observaciones: </Box>
              <Box>
                <Input
                  id="comentarios"
                  name="comentarios"
                  label=""
                  value={comprobante?.comentarios || ""}
                  sx={{
                    width: "350px",
                  }}
                  onChange={handleChangeComentarios}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
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
          <ButtonSave
            title="Grabar"
            type="submit"
            onClick={() => handleConfirm()}
          />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalMovementEdit;
