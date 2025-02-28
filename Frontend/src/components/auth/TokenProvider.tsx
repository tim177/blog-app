"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface TokenProviderProps {
  render: (token: string) => JSX.Element;
}

export default function TokenProvider({ render }: TokenProviderProps) {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken") || "";
      if (!storedToken) {
        router.push("/sign-in"); // Redirect if token missing
      } else {
        setToken(storedToken);
      }
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return token ? render(token) : null;
}
