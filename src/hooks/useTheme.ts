import React, { createContext, useContext, useState, useEffect } from "react";
import { getTheme, storedTheme } from "@/services/storageTheme";
import { ThemeContextType } from "@/types/themeProvider.types";
import { ModeType } from "@/gluestack/gluestack-ui-provider";
import { Platform } from "react-native";
import { Appearance } from "react-native";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ModeType>("dark");
  const { setColorScheme } = Appearance;

  const syncNativeWind = (mode: ModeType) => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const root = document.documentElement;
      if (mode === "dark") {
        root.classList.add("dark");
      } else if (mode === "light") {
        root.classList.remove("dark");
      } else if (mode === "system") {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isSystemDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    }

    if (mode === "system") {
      setColorScheme(undefined);
    } else {
      setColorScheme(mode);
    }
  };

  useEffect(() => {
    async function loadTheme() {
      try {
        const stored = await getTheme();
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemeState(stored);
          syncNativeWind(stored);
        } else {
          syncNativeWind(theme);
        }
      } catch (e) {
        console.error("Failed to load theme", e);
        syncNativeWind(theme);
      }
    }
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ModeType) => {
    setThemeState(newTheme);
    syncNativeWind(newTheme);
    await storedTheme(newTheme);
  };

  const setIsDark = async (value: boolean | ((prev: boolean) => boolean)) => {
    const nextIsDark = typeof value === "function" ? value(theme === "dark") : value;
    const newTheme: ModeType = nextIsDark ? "dark" : "light";
    setThemeState(newTheme);
    syncNativeWind(newTheme);
    await storedTheme(newTheme);
  };

  const isDark = theme === "dark";

  return React.createElement(ThemeContext.Provider, { value: { theme, isDark, setTheme, setIsDark } }, children);
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    const [theme, setThemeState] = useState<ModeType>("dark");
    const isDark = theme === "dark";
    const setIsDark = (val: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof val === "function" ? val(isDark) : val;
      setThemeState(next ? "dark" : "light");
    };
    return { theme, isDark, setTheme: setThemeState, setIsDark };
  }
  return context;
};

export default useTheme;
