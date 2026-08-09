import { useContext } from "react";
import AuthContext from "./ctxAuth";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

let inMemorySession: string | null = null;
let inMemoryExpiry: string | null = null;

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}

export async function getSession(): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem("session");
    } else {
      return (await SecureStore.getItemAsync("session")) || inMemorySession;
    }
  } catch (e) {
    console.warn("SecureStore getSession failed, using in-memory fallback", e);
    return inMemorySession;
  }
}

export async function saveSession(token: string) {
  if (!token) return;
  try {
    if (Platform.OS === "web") {
      localStorage.setItem("session", String(token));
    } else {
      await SecureStore.setItemAsync("session", String(token));
    }
  } catch (e) {
    console.warn("SecureStore saveSession failed, using in-memory fallback", e);
  } finally {
    inMemorySession = token;
  }
}

export async function removeSession() {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem("session");
    } else {
      await SecureStore.deleteItemAsync("session");
    }
  } catch (e) {
    console.warn("SecureStore removeSession failed", e);
  } finally {
    inMemorySession = null;
  }
}

export async function saveSessionExpiry(timestamp: number) {
  if (!timestamp) return;
  try {
    if (Platform.OS === "web") {
      localStorage.setItem("session_expiry", String(timestamp));
    } else {
      await SecureStore.setItemAsync("session_expiry", String(timestamp));
    }
  } catch (e) {
    console.warn("SecureStore saveSessionExpiry failed", e);
  } finally {
    inMemoryExpiry = String(timestamp);
  }
}

export async function getSessionExpiry(): Promise<number | null> {
  try {
    let val: string | null = null;
    if (Platform.OS === "web") {
      val = localStorage.getItem("session_expiry");
    } else {
      val = (await SecureStore.getItemAsync("session_expiry")) || inMemoryExpiry;
    }
    return val ? Number(val) : null;
  } catch (e) {
    console.warn("SecureStore getSessionExpiry failed", e);
    return inMemoryExpiry ? Number(inMemoryExpiry) : null;
  }
}

export async function removeSessionExpiry() {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem("session_expiry");
    } else {
      await SecureStore.deleteItemAsync("session_expiry");
    }
  } catch (e) {
    console.warn("SecureStore removeSessionExpiry failed", e);
  } finally {
    inMemoryExpiry = null;
  }
}