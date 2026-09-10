import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { exchangeOktaTokenForApiToken } from "./tokenChangeProvider";
import { Modal } from "antd";
import authTokenManager from "../api/authTokenManager";

const RequireAuth = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isTokenReady, setIsTokenReady] = useState(false);

  const handleLogout = useCallback(async () => {
    authTokenManager.clearToken();
    localStorage.clear();
    const logoutRedirectUri = window.location.origin + "/login";
    await oktaAuth.signOut({
      postLogoutRedirectUri: logoutRedirectUri,
    });
  }, [oktaAuth]);

  useEffect(() => {
    const initializeSession = async () => {
      // 1. Verificamos autenticación
      if (authState && authState.isAuthenticated) {
        const existingToken = authTokenManager.getToken();
        if (!existingToken) {
          try {
            // Aseguramos de que idToken exista antes de seguir
            if (authState.idToken?.idToken) {
              const idToken = authState.idToken.idToken;
              // ESPERAMOS a que la API intermedia responda y el manager guarde el token
              await exchangeOktaTokenForApiToken(idToken);
              // Luego guardamos el token
              setIsTokenReady(true);
            }
          } catch (error) {
            console.error("Authentication error: ", error);
            Modal.error({
              title: "Authentication error",
              content: "The security session could not be synchronized. Please log in again after 10 minutes.",
              onText: "Go LogIn",
              onOk: () => {
                handleLogout();
              },
            });
          }
        } else {
          // Si el token ya está en RAM, liberamos el paso inmediatamente
          setIsTokenReady(true);
        }
      }
    };

    initializeSession();
  }, [authState, handleLogout]);

  if (!authState) {
    return <div>Loading session...</div>;
  }

  // Si no está autenticado, redirigimos al login
  if (authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mientras se intercambia el token, mostramos un loader para evitar
  // que los componentes hijos intenten hacer peticiones sin el token final.
  if (isTokenReady) {
    return <div style={{ margin: "10px", padding: "10px" }}>Setting up secure environment...</div>;
  }

  return children;
};

export default RequireAuth;
