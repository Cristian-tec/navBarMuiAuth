import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookie from "universal-cookie";

export const eraseCookie = (fun) => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  const cookie = new Cookie();
  cookie.remove("nick", { path: "/" });
  cookie.remove("picture", { path: "/" });
  console.log("borrando...");
  fun();
};

export const hola = () => {
  console.log("holaaaaaaaaa");
};
