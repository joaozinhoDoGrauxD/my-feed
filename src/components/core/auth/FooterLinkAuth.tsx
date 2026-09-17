import React from "react";
import { Pressable } from "react-native";
import { Text } from "@/gluestack/text";
import { useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";

interface FooterLinkAuthProps {
  promptText?: string;
  text?: string;
  linkText: string;
  href: string;
  isBack?: boolean;
}

export default function FooterLinkAuth({
  promptText,
  text,
  linkText,
  href,
  isBack = false,
}: FooterLinkAuthProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  // Aceita tanto 'promptText' quanto 'text' para evitar erros de tipagem
  const displayText = promptText || text || "";

  const handlePress = () => {
    if (isBack) {
      router.back();
    } else {
      router.push(href as any);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center justify-center gap-1.5 mt-4 py-2"
    >
      <Text
        size="sm"
        className={isDark ? "text-slate-400" : "text-slate-600"}
      >
        {displayText}
      </Text>
      <Text
        size="sm"
        className="font-bold text-indigo-500 active:opacity-70"
      >
        {linkText}
      </Text>
    </Pressable>
  );
}