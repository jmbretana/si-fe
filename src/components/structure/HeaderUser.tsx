import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { capitalizeFirstLetter } from "@utils/utils";
// import { useAuth } from "@auth/AuthContext";
// Alternativa: usar el hook directo de Redux
import { useAuth } from "../../hooks/useAuth";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

export default function HeaderUser() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout, user, getFullName } = useAuth(); // Obtener estado de autenticación

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Obtener el nombre del usuario desde la sesión de autenticación
  const username = user
    ? capitalizeFirstLetter(getFullName() || user.username)
    : "Usuario";

  const logOutHandler = async () => {
    try {
      await logout();
      // Forzar redirección después del logout usando React Router
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Incluso si hay error, redirigir
      navigate("/login");
    }
  };

  const configHandler = () => {
    navigate("/configuracion");
  };

  return (
    <Box alignContent={"center"}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList dense>
          <MenuItem onClick={configHandler}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Configuración</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={logOutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: "1.9rem" }}>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
