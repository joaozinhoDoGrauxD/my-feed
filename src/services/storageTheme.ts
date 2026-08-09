import { ModeType } from "@/gluestack/gluestack-ui-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const getTheme = async () => {
    try {
        if (Platform.OS === "web" && typeof localStorage !== "undefined") {
            return localStorage.getItem("my-theme") as ModeType;
        }
        const theme = await AsyncStorage.getItem('my-theme')
        return theme as ModeType
    } catch (e) {
        console.error(e)
    }
}

export const storedTheme = async (theme: string) => {
  try {
     if (Platform.OS === "web" && typeof localStorage !== "undefined") {
         localStorage.setItem("my-theme", theme);
         return;
     }
     await AsyncStorage.setItem('my-theme', theme)
  } catch (e)  {
    console.error(e)
  }
}
