import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/middleware/store/store";

import HeaderComponent from "@components/structure/Header";
import FooterComponent from "@components/structure/Footer";

import { Box, Container, Snackbar, Alert, Fab } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  SNACK_FAIL,
  SNACK_SUCCESS,
} from "src/middleware/types/SnackActionTypes";
import { getInitialSnack } from "@actions/snackActions"; // assuming you have this action defined
import { COLORS } from "@values/colors";

const LayoutRoot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const snack = useSelector((state: RootState) => state.snack);

  useEffect(() => {
    if (snack.status === SNACK_SUCCESS) {
      setOpen(true);
      setError(false);
      setMessage(snack.message ? snack.message.toString() : "");
      getInitialSnack();
    }

    if (snack.status === SNACK_FAIL) {
      setOpen(true);
      setError(true);
      setMessage(snack.message ? snack.message.toString() : "");
      getInitialSnack();
    }
  }, [snack.status]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {" "}
      <HeaderComponent />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? COLORS.black : COLORS.grey_light,
            overflow: "auto",
          })}
        >
          <Container>
            <Box paddingTop={5} sx={{ minHeight: "88vh", width: "100%" }}>
              <Outlet />
            </Box>
          </Container>
          <FooterComponent />
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Adjusted for top right position
      >
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {showScroll && (
        <Fab
          color={"primary"}
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </>
  );
};

export default LayoutRoot;
