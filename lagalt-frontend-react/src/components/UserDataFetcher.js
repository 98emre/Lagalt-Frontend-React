import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { fetchUser } from "../api/userAPI";

const UserDataFetcher = () => {
  const dispatch = useDispatch();

  const { keycloak } = useKeycloak()


  useEffect(() => {
        if(keycloak.authenticated){
            dispatch(fetchUser(keycloak.token))
        }
  }, [keycloak.authenticated, dispatch, keycloak.token])


  return null;
};

export default UserDataFetcher;
