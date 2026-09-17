import React from "react";
import { useWindowDimensions } from "react-native";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import SafeAreaWrapper from "../core/SafeAreaWrapper";
import useTheme from "@/hooks/useTheme";

export default function MobileIndex() {
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();

  const cardPadding = width < 380 ? 20 : 28;

  return (
    <SafeAreaWrapper className={`flex-1 relative overflow-hidden ${isDark ? "bg-[#0b0c10]" : "bg-slate-50"}`}>
      {/* Esferas luminosas em Liquid Glass */}
      <Box className="absolute top-[-5%] left-[-10%] w-[280px] h-[280px] rounded-full bg-indigo-500/20 blur-[80px] pointer-events-none" />
      <Box className="absolute bottom-[10%] right-[-10%] w-[320px] h-[320px] rounded-full bg-sky-500/15 blur-[90px] pointer-events-none" />

      <Box className="flex-1 px-6 pt-4 relative z-10 justify-between">
        <HStack className="justify-between items-center mb-8">
          <Heading size="2xl" className={`font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Meu Feed
          </Heading>
        </HStack>

        <Box className="flex-1 justify-center items-center my-auto">
          <Card
            style={{ padding: cardPadding }}
            className={`rounded-[32px] border w-full max-w-[400px] backdrop-blur-2xl transition-all active:opacity-90 ${
              isDark
                ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                : "bg-[rgba(255,255,255,0.85)] border-[rgba(0,0,0,0.06)] shadow-xl"
            }`}
          >
            <Heading size="md" className={`mb-2 font-bold text-center tracking-wide ${isDark ? "text-white" : "text-slate-900"}`}>
              Bem-vindo ao seu Feed!
            </Heading>
            <Text size="sm" className={`text-center leading-relaxed ${isDark ? "text-slate-300/80" : "text-slate-600"}`}>
              Explore novos conteúdos, mude o tema ou utilize a barra de navegação inferior para navegar entre as seções.
            </Text>
          </Card>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
}