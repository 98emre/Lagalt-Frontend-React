import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloakConfig';

const MainContent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak.authenticated) {
    if (initialized) keycloak.login();
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mitt App Namn</h1>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

const App = () => (
  <ReactKeycloakProvider authClient={keycloak}>
    <MainContent />
  </ReactKeycloakProvider>
);

export default App;
