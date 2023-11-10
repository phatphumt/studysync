/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./config/firebase";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<
  | undefined
  | {
      signIn: (email: string, password: string) => Promise<null | string>;
      signUp: (email: string, password: string) => Promise<null | string>;
      logout: () => void;
      user: User | null;
      loading: boolean;
    }
>(undefined);

const SessionProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      return null;
    } catch (e) {
      return `${e}`;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      return null;
    } catch (e) {
      return `${e}`;
    }
  };

  const logout = () => {
    signOut(getAuth(app));
  };

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(getAuth(app), (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  return (
    <AuthContext.Provider value={{ signIn, logout, user, loading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SessionProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
