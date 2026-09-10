import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

import { oktaConfig } from "./okta/oktaConfig";
import RequireAuth from "./auth/requireAuth";
import Login from "./auth/login";
import MainLayout from "./components/menu/mainLayout";


// Creamos Okta una sola vez
const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || "/", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        {/* Okta callback */}
        <Route path="/auth/callback" element={<LoginCallback />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout>
              </MainLayout>
            </RequireAuth>
          }
        />
      </Routes>
    </Security>
  );
}

export default App;
