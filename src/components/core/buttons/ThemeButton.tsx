import { Button, ButtonIcon, ButtonText } from "@/gluestack/button";
import { Moon, Sun, LucideIcon } from "lucide-react-native";
import { Box } from "@/gluestack/box";
import useTheme from "@/hooks/useTheme";
import { Platform } from "react-native";

function MyIcon({ icon }: { icon: LucideIcon }) {
  return <ButtonIcon size="lg" as={icon} className="text-foreground" />
}

function MyText({ color }: { color: string }) {
  return <ButtonText className={`${color} font-medium text-sm mr-2`}>Mudar tema</ButtonText>
}

export default function ThemeButton() {
  const { isDark, setIsDark } = useTheme()
  return (
    <Box className={Platform.OS === "web" ? "m-auto mr-10" : "m-auto"}>
      <Button variant="outline" className={`rounded-2xl border-border ${Platform.OS === "android" ? "p-5" : "px-4 py-2"}`} size="sm" onPress={() => setIsDark(!isDark)}>
        {Platform.OS === 'web' ?
          isDark ?
            <MyIcon icon={Moon} />
            :
            <MyIcon icon={Sun} />

          :
          isDark ?
            <>
              <MyText color="text-foreground" />
              <MyIcon icon={Moon} />
            </>
            :
            <>
              <MyText color="text-foreground" />
              <MyIcon icon={Sun} />
            </>
        }


      </Button>
    </Box>
  )

}