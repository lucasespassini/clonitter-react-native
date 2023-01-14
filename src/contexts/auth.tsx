import React, { useEffect, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../provider/api";
import { IUser } from "../utils/interfaces";
// import jwt_decode from "jwt-decode";

interface IAuthProvider {
  authenticated: boolean;
  user: IUser;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthContext = createContext({} as IAuthProvider);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as IUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("@Clonitter:userdata");
      if (!value) {
        setIsLoading(false);
        return;
      }
      const userData = JSON.parse(value);

      api.defaults.headers.Authorization = `Bearer ${userData.token}`;
      setUser(userData.payload);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
