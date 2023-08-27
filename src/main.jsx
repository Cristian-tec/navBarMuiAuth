import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

let domainAuth0 = import.meta.env.VITE_AUTH0_DOMAIN;

ReactDOM.createRoot(document.getElementById("root")).render(

    <Auth0Provider
      domain={domainAuth0}
      //domain={domainAuth}
      clientId="oy4SkhIAGmqmNxSiTLnaEuWHNTqISAGN"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>

);
