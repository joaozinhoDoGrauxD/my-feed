import React from "react";
import { Button } from "@/gluestack/button";
import { Moon, Sun } from "lucide-react-native";
import { Box } from "@/gluestack/box";
import useTheme from "@/hooks/useTheme";

export default function ThemeButton() {
  const { isDark, setIsDark } = useTheme();

  const handleToggle = () => {
    // Aplica o efeito suave de transição em onda (View Transitions) caso esteja na Web
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as any).startViewTransition(() => {
        setIsDark((prev) => !prev);
      });
    } else {
      setIsDark((prev) => !prev);
    }
  };

  return (
    <Box className="m-auto">
      <Button
        variant="outline"
        size="sm"
        onPress={handleToggle}
        className={`rounded-xl px-3 py-2 border transition-all duration-500 ease-in-out backdrop-blur-md active:opacity-80 ${
          isDark
            ? "border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            : "border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        }`}
      >
        <Box className="transition-transform duration-500 ease-out transform">
          {isDark ? (
            <Sun size={18} className="text-amber-400 animate-spin-once" />
          ) : (
            <Moon size={18} className="text-indigo-600 animate-spin-once" />
          )}
        </Box>
      </Button>
    </Box>
  );
}