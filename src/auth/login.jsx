import React, { useEffect, useCallback } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Card, Button, Typography, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BG_IMAGE, LOGO_IMAGE } from "../constants/auth";

const { Title, Text } = Typography;

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [authState?.isAuthenticated, navigate]);

  const handleLogin = useCallback(async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error("Error al iniciar sesión con Okta:", error);
    }
  }, [oktaAuth]);

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <img src={LOGO_IMAGE} alt="Logo WU" style={styles.logo} />

          <Title level={3}>
            Log In <br />
            (Settlement Management)
          </Title>

          <Text type="secondary">Log in with your Okta credentials to continue</Text>

          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            onClick={handleLogin}
            block
            loading={authState?.isPending}
            style={styles.button}
          >
            LOG-IN (login via Okta)
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;

// Estilos
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${BG_IMAGE})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  card: {
    width: 360,
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    borderRadius: 12,
  },
  logo: {
    width: 160,
    margin: "0 auto",
  },
  button: {
    borderRadius: 6,
    fontWeight: 500,
  },
};
