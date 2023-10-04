import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './keycloakConfig';
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { BrowserRouter,Route, Routes  } from 'react-router-dom';


import LandingPage from "./pages/LandingPage"
import ProfilePage from "./pages/ProfilePage"
import ErrorPage from './pages/ErrorPage';

import Navbar from './components/Navbar';
import UserDataFetcher from './components/UserDataFetcher';
import ProjectDetail from './components/ProjectDetail';



const MainContent = () => {

  const { keycloak, initialized } = useKeycloak();
  const user = useSelector((state) => state.user.user);

  if (!initialized || !keycloak.authenticated) {
    if (initialized) keycloak.login();
    return <div>Loading...</div>;
  }



  return (
    <BrowserRouter>
      <UserDataFetcher />
      <h1>Welcome {user.username}</h1>
      <Navbar />
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/project/:id" element={<ProjectDetail/>} />
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
