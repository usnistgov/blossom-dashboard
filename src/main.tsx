import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth } from "api/auth";
import { Dashboard, Landing, NotFound, Transaction, UserInfo } from "pages";
import { Footer, Header } from "components";
import AdminBoard from "pages/AdminBoard";

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
              <Route path="admin-board" element={<AdminBoard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Footer links={[{ link: "", label: "" }]} />
        </div>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);