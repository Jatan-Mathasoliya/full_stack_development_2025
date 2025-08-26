import React from "react";
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import './index.css'

const domain = "dev-z8esj8egvt4kiktw.us.auth0.com";
const clientId = "F5tPmBrSwC7XGnkgSVw5pV3lOpvee4Hv";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
