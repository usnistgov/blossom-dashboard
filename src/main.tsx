import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider,RequireAuth } from "api/auth";
// import { AuthProvider } from "react-oidc-context";
import { Landing, NotFound, Transaction, UserInfo, AdminBoard, AssessorsBoard, SAMBoard } from "pages";
import { Footer, Header } from "components";

export const AUTH_URL = (import.meta.env.VITE_AUTH_URL ?? "") as string;
export const IDP_AUTH_URL = (import.meta.env.IDP_AUTH_URL) as string;
export const CLIENT_ID = (import.meta.env.VITE_CLIENT_ID ?? "") as string;
export const CLIENT_SECRET = (import.meta.env.VITE_CLIENT_SECRET ??
  "") as string;
// Example of the Cognito-IDP authentication
const cognitoAuthConfig = {
  authority: IDP_AUTH_URL,
  client_id: CLIENT_ID,
  redirect_uri: "http://localhost:4000/dev/",
  response_type: "code",
  scope: "email openid",
};
{
  /// <AuthProvider {...cognitoAuthConfig}>
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <div
          style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Put auth routes here */}
              <Route path="userinfo" element={<UserInfo />} />
              <Route path="transaction" element={<Transaction />} />
              <Route path="*" element={<NotFound />} />
              <Route path="admin-board" element={<AdminBoard />} />
              <Route path="assessors-board" element={<AssessorsBoard />} />
              <Route path="sam-board" element={<SAMBoard />} />
            </Route>
          </Routes>
          <Footer links={[{ link: "", label: "" }]} />
        </div>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
