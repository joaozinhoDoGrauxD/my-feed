import React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Center } from "@/components/ui/center";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import { usePlayer } from "@/hooks/usePlayer";
import { VStack } from "@/gluestack/vstack";
import { Play, SkipBack, SkipForward, Music, Volume2, StepBack, StepForward } from "lucide-react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import useTheme from "@/hooks/useTheme";

export default function PlayerPage() {
  const url = "";
  const { playSound, pauseSound, skipBackward, skipForward, formatTime, isPlaying, position, duration } =
    usePlayer(url);
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();

  const cardPadding = width < 380 ? 16 : 20;

  return (
    <SafeAreaWrapper className={`flex-1 ${isDark ? "bg-[#0b0c10]" : "bg-slate-50"}`}>
      <Box className="flex-1 px-6 pt-2">
        <Center>
          <HStack className="justify-between items-center mb-2">
            <Heading size="xl" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Player
            </Heading>
          </HStack>
        </Center>

        <VStack className="flex-1 justify-center items-center pb-28">
          {/* Card com efeito Liquid Glass aprimorado no Dark Mode */}
          <Card
            style={{ padding: cardPadding }}
            className={`rounded-[30px] border w-full max-w-[340px] backdrop-blur-3xl shadow-2xl ${
              isDark
                ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.22)] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                : "bg-[rgba(255,255,255,0.85)] border-[rgba(0,0,0,0.06)] shadow-xl"
            }`}
          >
            {/* Capa também em vidro fosco */}
            <Box
              className={`w-full aspect-square rounded-2xl justify-center items-center mb-5 overflow-hidden border relative ${
                isDark
                  ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.15)]"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <Music size={56} className="text-indigo-400 opacity-80" />
              <Box className="absolute bottom-3 left-3 bg-indigo-600/90 px-3 py-1 rounded-full border border-indigo-400/30">
                <Text size="xs" className="text-white font-semibold">Áudio</Text>
              </Box>
            </Box>

            {/* Informações da Faixa */}
            <HStack className="justify-between items-center mb-4">
              <VStack className="flex-1 mr-4">
                <Heading size="sm" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`} numberOfLines={1}>
                  Episódio #42 - O Futuro do React Native
                </Heading>
                <Text size="xs" className={`font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Meu Feed Podcast
                </Text>
              </VStack>
            </HStack>

            {/* Progresso de Reprodução */}
            <VStack space="xs" className="mb-5">
              <Box className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-200"}`}>
                <Box className="w-1/3 h-full bg-indigo-500 rounded-full" />
              </Box>
              <HStack className="justify-between">
                <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-600"}>12:34</Text>
                <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-600"}>45:20</Text>
              </HStack>
            </VStack>

            {/* Controles do Player */}
            <HStack className="justify-center items-center mb-4" space="lg">
              <TouchableOpacity activeOpacity={0.7}>
                <StepBack size={22} className={isDark ? "text-slate-200" : "text-slate-700"} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SkipBack size={24} className={isDark ? "text-slate-200" : "text-slate-700"} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                className="w-15 h-15 bg-indigo-600 rounded-full justify-center items-center shadow-lg shadow-indigo-500/40 active:opacity-80"
              >
                <Play size={26} className="text-white ml-0.5" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SkipForward size={24} className={isDark ? "text-slate-200" : "text-slate-700"} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <StepForward size={22} className={isDark ? "text-slate-200" : "text-slate-700"} />
              </TouchableOpacity>
            </HStack>

            {/* Controle de Volume */}
            <HStack className="justify-center items-center mt-1" space="xs">
              <Volume2 size={15} className={isDark ? "text-slate-400" : "text-slate-600"} />
              <Box className={`w-20 h-1 rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}>
                <Box className="w-1/2 h-full bg-indigo-500 rounded-full" />
              </Box>
            </HStack>
          </Card>
        </VStack>
      </Box>
    </SafeAreaWrapper>
  );
}