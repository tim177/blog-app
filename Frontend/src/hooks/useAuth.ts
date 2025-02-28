// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  _id?: string;
  username?: string;
  photo?: string;
  readList?: string[];
  // add any additional properties
}

export function useAuth() {
  const [authToken, setAuthToken] = useState<string>("");
  const [activeUser, setActiveUser] = useState<User>({});
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Ensure client-side before accessing localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken") || "";

      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (!authToken) {
      setLoadingAuth(false);
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/private`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setActiveUser(res.data.user);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        setActiveUser({});
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  }, [authToken]);

  return { authToken, activeUser, loadingAuth };
}
