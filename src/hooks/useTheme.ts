import { ModeType } from "@/components/ui/gluestack-ui-provider";
import { useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<ModeType>("light")

  return {theme, setTheme}
}

export default useTheme