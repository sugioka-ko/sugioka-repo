// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// あなたのCognito設定
const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_SuFr50b5x",
  client_id: "2jrq9mqinhseiv7qh08t0ds7bg",
  // Amplifyの公開URL
  redirect_uri: "https://main.d2ss8p1mi1643o.amplifyapp.com",
  response_type: "code",
  scope: "openid email",
  // ログアウト後のリダイレクト先
  post_logout_redirect_uri: "https://main.d2ss8p1mi1643o.amplifyapp.com",
  // client_idをログアウト処理に含めるための設定
  extraQueryParams: {
    client_id: "2jrq9mqinhseiv7qh08t0ds7bg",
  },
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