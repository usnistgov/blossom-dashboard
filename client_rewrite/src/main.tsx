import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from 'api/auth'
import { AuthCallback, Landing, NotFound } from 'pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/" element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }>
            {/* Put auth routes here */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
