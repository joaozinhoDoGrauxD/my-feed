import React from "react";
import { Button, ButtonText } from "@/gluestack/button";
import { useRouter, usePathname } from "expo-router";
import useTheme from "@/hooks/useTheme";

interface NavigateButtonProps {
  route: string;
  title: string;
  variant?: "default" | "outline" | "link";
}

export default function NavigateButton({
  route,
  title,
  variant = "default",
}: NavigateButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useTheme();

  const targetPath = route === "" || route === "/" ? "/" : `/${route.replace(/^\//, "")}`;

  const isActive =
    targetPath === "/"
      ? pathname === "/" || pathname === ""
      : pathname.includes(route);

  const handlePress = () => {
    router.navigate(targetPath as any);
  };

  return (
    <Button
      variant={variant}
      className={`rounded-xl px-5 py-2.5 backdrop-blur-xl transition-all duration-300 active:opacity-80 border ${
        isActive
          ? "bg-indigo-600 border-indigo-500"
          : isDark
          ? "bg-[rgba(255,255,255,0.06)] active:bg-[rgba(255,255,255,0.18)] border-[rgba(255,255,255,0.1)]"
          : "bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.12)] border-[rgba(0,0,0,0.1)]"
      }`}
      onPress={handlePress}
    >
      <ButtonText
        className={`font-medium text-sm tracking-wide ${
          isActive
            ? "text-white"
            : isDark
            ? "text-slate-200"
            : "text-slate-800"
        }`}
      >
        {title}
      </ButtonText>
    </Button>
  );
}