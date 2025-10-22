import React, { useState } from "react";
import {
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  MenuList,
  MenuItem,
} from "@mui/material";
import { COLORS } from "@values/colors";
import { getMenuListItemsMobile } from "./ItemsMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@common/ThemeContext";
import { useAuth } from "@auth/AuthContext";

//

const MenuMobile: React.FunctionComponent = () => {
  const { logout, user } = useAuth(); // Obtener estado de autenticación y usuario
  const { theme } = useThemeContext(); // Obtener el tema actual

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Obtener los items del menú filtrados por el rol del usuario
  const menuListItemsMobile = getMenuListItemsMobile(user?.role);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the button that triggered the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu by setting anchorEl to null
  };

  const navigateToLink = (link: string) => () => {
    setAnchorEl(null); // Close the menu
    window.location.href = link; // Navigate to the specified link
  };

  const logOutHandler = () => {
    logout();
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen} // Open the menu
      >
        <MenuIcon
          sx={{
            color:
              theme.palette.mode === "dark" ? COLORS.white : COLORS.grey_dark,
            fontSize: "40px",
          }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl} // Anchor the menu to the button
        open={Boolean(anchorEl)} // Open the menu if anchorEl is not null
        onClose={handleMenuClose} // Close the menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {menuListItemsMobile.items.sort().map((item) => (
            <ListItem key={item.key}>
              <ListItemButton
                onClick={navigateToLink(item.link)}
                sx={(theme) => ({
                  padding: 0,
                  color:
                    theme.palette.mode === "dark" ? COLORS.white : COLORS.black,
                })}
              >
                <ListItemText
                  primary={item.text}
                  color={menuListItemsMobile.color}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <MenuList>
          <MenuItem onClick={navigateToLink("/configuracion")}>
            <ListItemText>Configuración</ListItemText>
          </MenuItem>
          <MenuItem onClick={logOutHandler}>
            <ListItemText sx={{ fontSize: "1.9rem" }}>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default MenuMobile;
