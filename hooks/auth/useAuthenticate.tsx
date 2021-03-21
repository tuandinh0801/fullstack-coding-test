import fr from "firebase";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import firebase from "services/firebase";

type email = string;
type password = string;

const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: (email, password) => null,
  signUp: (email, password) => null,
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

  const signUp = useCallback((email: email, password: password): Promise<any> => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }, []);

  const login = useCallback((email: email, password: password): Promise<any> => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  const logout = useCallback((): void => {
    firebase.auth().signOut();
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>{children}</AuthContext.Provider>;
};

const useAuthenticate = () => useContext(AuthContext);

export { useAuthenticate, AuthProvider };
