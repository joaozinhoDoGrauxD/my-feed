import {api} from "@/services/api";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { removeSessionExpiry, saveSessionExpiry } from "./session";

export async function registerUser(email: string, password: string) {

  const res = await api.post("/auth/register", {email: email, password: password}, {
    validateStatus: () => true
  })

 const resOk = res.status >= 200 && res.status< 300;

  if (!resOk) {
    throw new Error("Credenciais inválidas");
  }

  return res;
}

export async function signInFunction(email: string, password: string): Promise<string> {
  if (!email || !password) throw new Error("Preencha todos os campos");

 const res = await api.post("/auth/login", {email: email, password: password }, {
  validateStatus: () => true
 })

 const resOk = res.status >= 200 && res.status< 300;

  if (!resOk) {
    throw new Error("Credenciais inválidas");
  }

  const data = await res.data;
  const token = data.access_token;

  if (Platform.OS === "web") {
    localStorage.setItem("session", token);
  } else {
    await SecureStore.setItemAsync("session", token);
  }

  if (data.expiry_timestamp) {
    let expiryNum = Number(data.expiry_timestamp);
    if (expiryNum < 10000000000) {
      expiryNum = expiryNum * 1000;
    }
    await saveSessionExpiry(expiryNum);
  } else {
    await removeSessionExpiry();
  }

  return token;
}

export async function signOutFunction(): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem("session");
  } else {
    await SecureStore.deleteItemAsync("session");
  }
  await removeSessionExpiry();
}
