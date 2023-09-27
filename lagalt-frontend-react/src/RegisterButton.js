// RegisterButton.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function RegisterButton() {
  const { keycloak } = useKeycloak();


  const handleRegister = () => {
    keycloak.register(); // Öppnar Keycloak-registrering
  };

  return (
    <button onClick={handleRegister}>Registrera</button>
  );
}

export default RegisterButton;
