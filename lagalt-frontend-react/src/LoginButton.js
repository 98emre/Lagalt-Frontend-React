import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function LoginButton() {
  const { keycloak } = useKeycloak();

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login(); // Öppna Keycloak-inloggningssidan
    }
  };

  return (
    <button onClick={handleLogin}>Logga in</button>
  );
}

export default LoginButton;
