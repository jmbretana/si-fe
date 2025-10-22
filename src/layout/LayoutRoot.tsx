import React from "react";
import { Outlet } from "react-router-dom";
import SessionRedirectHandler from "@components/auth/SessionRedirectHandler";

const LayoutRoot = () => {
  return (
    <SessionRedirectHandler>
      <Outlet />
    </SessionRedirectHandler>
  );
};

export default LayoutRoot;
