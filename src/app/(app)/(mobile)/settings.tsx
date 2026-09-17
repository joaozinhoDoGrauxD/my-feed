import React from "react";
import { TouchableOpacity, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Box } from "@/components/ui/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import { VStack } from "@/gluestack/vstack";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import ThemeButton from "@/components/core/buttons/ThemeButton";
import SignOutButton from "@/components/core/buttons/SignOutButton";
import useTheme from "@/hooks/useTheme";
import { Palette, Info, LogOut, ChevronRight } from "lucide-react-native";

export default function SettingsPage() {
  const { isDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaWrapper className={`flex-1 ${isDark ? "bg-[#0b0c10]" : "bg-slate-100"}`}>
      {/* Esferas decorativas de fundo */}
      <Box
        className={`absolute top-[5%] left-[-15%] w-[280px] h-[280px] rounded-full blur-[90px] pointer-events-none ${
          isDark ? "bg-indigo-600/20" : "bg-indigo-400/30"
        }`}
      />
      <Box
        className={`absolute top-[40%] right-[-15%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none ${
          isDark ? "bg-purple-600/20" : "bg-purple-300/40"
        }`}
      />

      <Box className="flex-1 px-6 pt-4">
        {/* Cabeçalho */}
        <VStack space="xs" className="mb-6">
          <Heading size="2xl" className={`font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Configurações
          </Heading>
          <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-500"}>
            Personalize sua experiência e gerencie sua conta
          </Text>
        </VStack>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <VStack space="md" className="w-full max-w-[420px] mx-auto">
            
            {/* Bloco 1: Aparência */}
            <Card
              className={`p-5 rounded-[24px] border overflow-hidden relative backdrop-blur-3xl ${
                isDark
                  ? "bg-slate-900/40 border-white/10"
                  : "bg-white/80 border-white"
              }`}
            >
              {Platform.OS !== "web" && (
                <BlurView
                  intensity={isDark ? 30 : 60}
                  tint={isDark ? "dark" : "light"}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />
              )}
              <VStack space="md" className="relative z-10">
                <HStack space="md" className="items-center">
                  <Box className={`p-2.5 rounded-2xl ${isDark ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-indigo-50 border border-indigo-100"}`}>
                    <Palette size={20} className={isDark ? "text-indigo-400" : "text-indigo-600"} />
                  </Box>
                  <VStack className="flex-1">
                    <Text className={`font-semibold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                      Aparência
                    </Text>
                    <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-500"}>
                      Alterne entre o modo claro e escuro
                    </Text>
                  </VStack>
                </HStack>

                <Box className="pt-2 items-center w-full">
                  <ThemeButton />
                </Box>
              </VStack>
            </Card>

            {/* Bloco 2: Sobre o App */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/about")}
              className="w-full"
            >
              <Card
                className={`p-5 rounded-[24px] border overflow-hidden relative backdrop-blur-3xl ${
                  isDark
                    ? "bg-slate-900/40 border-white/10"
                    : "bg-white/80 border-white"
                }`}
              >
                {Platform.OS !== "web" && (
                  <BlurView
                    intensity={isDark ? 30 : 60}
                    tint={isDark ? "dark" : "light"}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                  />
                )}
                <HStack className="justify-between items-center relative z-10">
                  <HStack space="md" className="items-center flex-1">
                    <Box className={`p-2.5 rounded-2xl ${isDark ? "bg-sky-500/20 border border-sky-500/30" : "bg-sky-50 border border-sky-100"}`}>
                      <Info size={20} className={isDark ? "text-sky-400" : "text-sky-600"} />
                    </Box>
                    <VStack className="flex-1">
                      <Text className={`font-semibold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                        Sobre o App
                      </Text>
                      <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-500"}>
                        Versão, recursos e arquitetura
                      </Text>
                    </VStack>
                  </HStack>
                  <ChevronRight size={18} className={isDark ? "text-slate-400" : "text-slate-500"} />
                </HStack>
              </Card>
            </TouchableOpacity>

            {/* Bloco 3: Sair da conta */}
            <Card
              className={`p-5 rounded-[24px] border overflow-hidden relative backdrop-blur-3xl ${
                isDark
                  ? "bg-slate-900/40 border-white/10"
                  : "bg-white/80 border-white"
              }`}
            >
              {Platform.OS !== "web" && (
                <BlurView
                  intensity={isDark ? 30 : 60}
                  tint={isDark ? "dark" : "light"}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />
              )}
              <VStack space="md" className="relative z-10">
                <HStack space="md" className="items-center">
                  <Box className={`p-2.5 rounded-2xl ${isDark ? "bg-red-500/20 border border-red-500/30" : "bg-red-50 border border-red-100"}`}>
                    <LogOut size={20} className={isDark ? "text-red-400" : "text-red-600"} />
                  </Box>
                  <VStack className="flex-1">
                    <Text className={`font-semibold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                      Sair da Conta
                    </Text>
                    <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-500"}>
                      Encerre sua sessão no dispositivo
                    </Text>
                  </VStack>
                </HStack>

                <Box className="pt-2 items-center w-full">
                  <SignOutButton />
                </Box>
              </VStack>
            </Card>

          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  );
}