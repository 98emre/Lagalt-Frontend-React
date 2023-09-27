import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloakConfig';
import { Provider } from "react-redux";
import store from "./store";
import Cart from './components/Cart';


const MainContent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak.authenticated) {
    if (initialized) keycloak.login();
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mitt App Namn</h1>
      <Cart></Cart>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}> 
    <ReactKeycloakProvider authClient={keycloak}>
      <MainContent />
    </ReactKeycloakProvider>
  </Provider>

);

export default App;
