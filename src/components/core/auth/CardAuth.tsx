import React from "react";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import useTheme from "@/hooks/useTheme";

interface CardAuthProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function CardAuth({ title, subtitle, children }: CardAuthProps) {
  const { isDark } = useTheme();

  return (
    <Box
      className={`w-full max-w-[390px] md:max-w-[420px] rounded-[32px] p-6 backdrop-blur-2xl border z-10 transition-all ${
        isDark
          ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.12)]"
          : "bg-[rgba(255,255,255,0.85)] border-[rgba(0,0,0,0.08)] shadow-xl"
      }`}
    >
      <Center>
        <Heading
          bold
          className={`mb-1 text-xl ${isDark ? "text-white" : "text-slate-900"}`}
          size="xl"
        >
          {title}
        </Heading>
        <Text
          size="sm"
          className={`mb-6 font-medium text-center ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </Text>
      </Center>
      {children}
    </Box>
  );
}