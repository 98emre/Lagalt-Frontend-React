import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloakConfig';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter,Route, Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';

import LandingPage from "./pages/LandingPage"
import ProfilePage from "./pages/ProfilePage"
import ErrorPage from './pages/ErrorPage';
import UserDataFetcher from './components/UserDataFetcher';



const MainContent = () => {

  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak.authenticated) {
    if (initialized) keycloak.login();
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <UserDataFetcher />
      <h1>Welcome Boiiii</h1>
      <Navbar />
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </BrowserRouter>
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
