import { Button, ButtonIcon} from "@/components/ui/button";
import { useState } from "react";
import { LightbulbOffIcon, LightbulbIcon } from "lucide-react-native";
import { ModeType } from "@/components/ui/gluestack-ui-provider";

export default function ThemeButton ({func} : {func: React.Dispatch<React.SetStateAction<ModeType>>}) {
  const [isDark, setIsDark] = useState<boolean>(true);
  return (
 <Button variant="outline" size="sm" onPress={() => {
          setIsDark(!isDark)
          isDark ? func('dark') : func('light')
  }}>
      {isDark ? (<LightbulbOffIcon size={18} color={"white"}/>) : (<LightbulbIcon size={18} color={"black"}/>)}
      </Button>
  )
}