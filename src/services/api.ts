import { create } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(":")[0];
const API_HOST =
  localIp || (Platform.OS === "android" ? "10.0.2.2" : "localhost");

const TUNNEL_HOST = process.env.EXPO_PUBLIC_TUNNEL;
const PRODUCTION_HOST = process.env.EXPO_PUBLIC_PRODUCTION;
const LOCAL_HOST: string | undefined = `http://${API_HOST}:3000`;

const myURL = (): string | undefined => {
  if (process.env.CODESPACES || process.env.EXPO_PUBLIC_BUN_ENV === "testing") {
    return TUNNEL_HOST;
  } else if (process.env.EXPO_PUBLIC_BUN_ENV === "development") {
    return LOCAL_HOST;
  } else {
    return PRODUCTION_HOST;
  }
};

export const api = create({
  baseURL: myURL(),
});
