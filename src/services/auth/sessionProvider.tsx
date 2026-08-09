import React, { useState, useEffect } from "react";
import AuthContext from "./ctxAuth";
import { AuthContextType } from "@/types/authContext.types";
import { signInFunction, signOutFunction } from "./authFunctions";
import { saveSession, removeSession, getSession } from "./session";
import { api } from "@/services/api";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((value) => {
      setSession(value);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (session) {
      api.defaults.headers.common["Authorization"] = `Bearer ${session}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [session]);

  async function signIn(email: string, password: string) {
    const token = await signInFunction(email, password);
    await saveSession(token);
    setSession(token);
  }

  async function signOut() {
    await signOutFunction();
    await removeSession();
    setSession(null);
  }

  const value: AuthContextType = { signIn, signOut, session, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
