// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// あなたのCognito設定
const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_wpKqFop4X", // スクリーンショットの情報
  client_id: "1l2u883r4nqf0cvmbpg500nchu", // あなたのアプリクライアントID
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