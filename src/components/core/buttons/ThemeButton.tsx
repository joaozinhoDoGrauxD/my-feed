import { Button, ButtonIcon } from "@/gluestack/button";
import { LightbulbOffIcon, LightbulbIcon, LucideIcon } from "lucide-react-native";
import { Box } from "@/gluestack/box";
import useTheme from "@/hooks/useTheme";

function MyIcon ({icon} : {icon : LucideIcon}) {
  return <ButtonIcon  size="lg" as={icon} />
}

export default function ThemeButton() {
const {isDark, setIsDark} = useTheme()
  return (
    <Box className="m-auto mr-10">
      <Button variant="outline" size="sm" onPress={() => setIsDark(!isDark)}>
        { isDark ?
        <MyIcon icon={LightbulbIcon}/>
        : <MyIcon icon={LightbulbOffIcon}/> }
      </Button>
    </Box>
  )

}