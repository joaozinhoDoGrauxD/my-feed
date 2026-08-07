import { ModeType } from "@/gluestack/gluestack-ui-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTheme = async () => {
    try {
        const theme = await AsyncStorage.getItem('my-theme')
        return theme as ModeType
    } catch (e) {
        console.error(e)
    }
}

export const storedTheme = async (theme: string) => {
  try {
     AsyncStorage.setItem('my-theme', theme)
  } catch (e)  {
    console.error(e)
  }
}
