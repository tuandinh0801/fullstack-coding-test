import fr from "firebase";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import Authenticate from "repositories/authenticate";
import firebase from "services/firebase";

type SignupData = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
};

type LoginData = {
  email: string;
  password: string;
};

const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: (loginData: LoginData) => null,
  signUp: (signUpData: SignupData) => null,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authState) => {
      setUser(authState);
      setIsLoading(false);
    });
  }, []);

  const signUp = useCallback((signUpData: SignupData): Promise<any> => {
    return Authenticate.signUp(signUpData);
  }, []);

  const login = useCallback(async (loginData: LoginData): Promise<any> => {
    await firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password);
    const idToken = await firebase.auth().currentUser.getIdToken();
    return Authenticate.login({ idToken });
  }, []);

  const logout = useCallback((): void => {
    firebase.auth().signOut();
    localStorage.removeItem("accessToken");
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>{children}</AuthContext.Provider>;
};

const useAuthenticate = () => useContext(AuthContext);

export { useAuthenticate, AuthProvider };
