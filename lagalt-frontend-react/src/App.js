import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloakConfig';


const MainContent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    window.location.href = keycloak.createLoginUrl();
    return null;
  }

  return (
    <div>
      <h1>Mitt App Namn</h1>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <MainContent />
    </ReactKeycloakProvider>
  );
};

export default App;
