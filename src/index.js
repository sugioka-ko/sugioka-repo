// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// あなたのCognito設定
// index.js

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_rJEokHAcd",
  client_id: "4uqmkgcvp76bo3pq6r22rcchg4",
  // Amplifyの公開URLに変更
  redirect_uri: "https://main.d2ss8p1mi1643o.amplifyapp.com",
  response_type: "id_token token",
  scope: "openid email",
  // ログアウト後のリダイレクト先も同様に変更
  post_logout_redirect_uri: "https://main.d2ss8p1mi1643o.amplifyapp.com",
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