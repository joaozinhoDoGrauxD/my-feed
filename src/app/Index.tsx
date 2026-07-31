import { ReactNode } from "react";
import RootLayout from "./_layout";
import { useState } from "react";
import { Platform, View } from "react-native";
import Input from "@/components/web/Input";
import Header from "@/components/web/Header";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ModeType } from "@/components/ui/gluestack-ui-provider";
import { LightbulbOffIcon, LightbulbIcon } from "lucide-react-native";

function ThemeButton ({func} : {func: React.Dispatch<React.SetStateAction<ModeType>>}) {
  const [isDark, setIsDark] = useState<boolean>(true);
  return (
 <Button className="m-55 rounded-full" variant="default" size="lg" onPress={() => {
          setIsDark(!isDark)
          isDark ? func('dark') : func('light')
  }}>
      <ButtonIcon as={ isDark ? LightbulbIcon : LightbulbOffIcon }></ButtonIcon>
      </Button>
  )
}
export default function Index(): ReactNode {
  const [theme, setTheme] = useState<ModeType>("light")
  return (
    <RootLayout theme={theme}>
      {Platform.OS === 'web' ? (
        <>
    <View className="flex-1 bg-zinc-900">
      <Header />
      <Input />
    </View>
    <View>
      
    </View>
    </>
      ) : (
        <View className="flex-1 bg-cyan-300 content-center">
        <View className="mt-60 bg-yellow-400 ">
          <View>
           <ThemeButton func={setTheme}></ThemeButton> 

          </View>
        </View>
        </View>
      )}
    </RootLayout>
)
}
