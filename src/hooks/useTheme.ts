import React, { createContext, useContext, useState, useEffect } from "react";
import { getTheme, storedTheme } from "@/services/storageTheme";
import { ThemeContextType } from "@/types/themeProvider.types";
import { ModeType } from "@/gluestack/gluestack-ui-provider";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ModeType>("dark");

  useEffect(() => {
    async function loadTheme() {
      try {
        const stored = await getTheme();
        if (stored === "light" || stored === "dark") {
          setThemeState(stored);
        }
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    }
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ModeType) => {
    setThemeState(newTheme);
    await storedTheme(newTheme);
  };

  const setIsDark = async (value: boolean | ((prev: boolean) => boolean)) => {
    const nextIsDark = typeof value === "function" ? value(theme === "dark") : value;
    const newTheme: ModeType = nextIsDark ? "dark" : "light";
    setThemeState(newTheme);
    await storedTheme(newTheme);
  };

  const isDark = theme === "dark";

  return React.createElement(ThemeContext.Provider, { value: { theme, isDark, setTheme, setIsDark } }, children);
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    const [theme, setTheme] = useState<ModeType>("dark");
    const isDark = theme === "dark";
    const setIsDark = (val: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof val === "function" ? val(isDark) : val;
      setTheme(next ? "dark" : "light");
    };
    return { theme, isDark, setTheme, setIsDark };
  }
  return context;
};

export default useTheme;