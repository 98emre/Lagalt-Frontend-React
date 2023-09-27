// UserAuth.js
import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const UserAuth = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  }, [keycloak.authenticated]);

  return (
    <div>{`Användaren är ${!keycloak.authenticated ? 'INTE ' : ''}autentiserad`}</div>
  );
};

export default UserAuth;
