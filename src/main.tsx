import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider,RequireAuth } from "api/auth";
// import { AuthProvider } from "react-oidc-context";
import { Landing, NotFound, Transaction, UserInfo, AdminBoard, AssessorsBoard, SAMBoard } from "pages";
import { Footer, Header } from "components";

// Example of the Cognito-IDP authentication
const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wioSQKwya",
  client_id: "n5ukaqkov14g3ca37h2gl0ats",
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
