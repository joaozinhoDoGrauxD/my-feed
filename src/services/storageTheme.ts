import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModeType } from "@/components/ui/gluestack-ui-provider";

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
