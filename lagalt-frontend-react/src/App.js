import React, { useEffect } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import UserAuth from './UserAuth';

const App = () => {

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  }, [keycloak.authenticated]);

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <div>
        <h1>Mitt App Namn</h1>
        
        <LoginButton />

        <RegisterButton />
        <UserAuth></UserAuth>
      </div>
    </ReactKeycloakProvider>
  );
};

export default App;
