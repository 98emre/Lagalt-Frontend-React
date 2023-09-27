// keycloak.js

import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://lemur-10.cloud-iam.com/auth/',
  realm: 'lagalt',
  clientId: 'lagalt-id',
  onLoad: 'login-required',
  enableDebug: true 
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
