"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface User {
  _id?: string;
  email?: string;
  username?: string;
  photo?: string;
  readList?: string[];
}

interface AuthContextType {
  activeUser: User | null;
  config: { headers: { "Content-Type": string; authorization: string } };
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>;
  setConfig: React.Dispatch<
    React.SetStateAction<{
      headers: { "Content-Type": string; authorization: string };
    }>
  >;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: "", // Initialize empty, update later
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken") || "";
      if (token) {
        setConfig((prevConfig) => ({
          ...prevConfig,
          headers: {
            ...prevConfig.headers,
            authorization: `Bearer ${token}`,
          },
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (!config.headers.authorization) return;

    const controlAuth = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/private`,
          config
        );
        setActiveUser(data.user);
      } catch (error) {
        console.error("Auth error:", error);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("authToken");
        }
        setActiveUser(null);
      }
    };

    controlAuth();
  }, [config.headers.authorization]); // Ensure it only triggers when authorization updates

  return (
    <AuthContext.Provider
      value={{ activeUser, config, setActiveUser, setConfig }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
