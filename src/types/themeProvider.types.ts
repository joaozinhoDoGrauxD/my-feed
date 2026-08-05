import { ModeType } from "@/gluestack/gluestack-ui-provider";

export interface ThemeContextType {
  theme: ModeType;
  isDark: boolean;
  setTheme: (theme: ModeType) => void;
  setIsDark: (isDark: boolean | ((prev: boolean) => boolean)) => void;
}