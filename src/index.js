// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// あなたのCognito設定
const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_fvJBzWx9F", // スクリーンショットの情報
  client_id: "22tvs2tsgiihsbc4hbd8n65pf", // あなたのアプリクライアントID
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// <App /> を <AuthProvider> で囲む
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();