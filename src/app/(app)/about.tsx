import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Platform, Modal, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card } from "@/gluestack/card";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { HStack } from "@/gluestack/hstack";
import { VStack } from "@/gluestack/vstack";
import Header from "@/components/web/header/HeaderWeb";
import NavigateButton from "@/components/core/buttons/NavigateButton";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import useTheme from "@/hooks/useTheme";
import { 
  Rss, 
  Bookmark, 
  FolderTree, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Layers,
  CheckCircle2
} from "lucide-react-native";

export default function AboutPage() {
  const { isDark } = useTheme();
  const router = useRouter();

  // Lógica do Easter Egg
  const [taps, setTaps] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleSecretTap = () => {
    const newTaps = taps + 1;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (newTaps >= 5) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setShowEasterEgg(true);
      setTaps(0);
    } else {
      setTaps(newTaps);
    }
  };

  // Modal do Easter Egg com GIF
  const EasterEggModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={showEasterEgg}
      onRequestClose={() => setShowEasterEgg(false)}
    >
      <Box className="flex-1 justify-center items-center px-6 bg-black/70 backdrop-blur-md">
        <Card
          className={`p-6 rounded-[32px] border w-full max-w-[360px] items-center ${
            isDark ? "bg-slate-900 border-indigo-500/30" : "bg-white border-slate-200 shadow-xl"
          }`}
        >
          {/* Container do GIF */}
          <Box className="w-36 h-36 mb-4 overflow-hidden rounded-2xl justify-center items-center bg-indigo-950/20">
            <Image
              source={{ uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZvZGR2MW9iOWh4NHE1bmxrdjltZWkyaDF2bzlydHltNGY0bmJvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif" }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </Box>

          <Heading size="lg" className={`font-bold mb-1 text-center ${isDark ? "text-white" : "text-slate-900"}`}>
            ¡Projeto Concluído! 🎓
          </Heading>

          <Text size="xs" className="text-indigo-500 font-bold mb-4 tracking-wider uppercase">
            Modo Desenvolvedor Desbloqueado
          </Text>

          <Text className={`text-sm text-center mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Parabéns pelo fim do curso! Este projeto foi construído com muito esforço, noites de código e café. Obrigado por testar até aqui! 🚀
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowEasterEgg(false)}
            className="w-full bg-indigo-600 py-3.5 rounded-2xl items-center shadow-lg shadow-indigo-500/30"
          >
            <HStack space="xs" className="items-center">
              <CheckCircle2 size={18} className="text-white" />
              <Text className="text-white font-bold text-sm">Oficialmente Formado!</Text>
            </HStack>
          </TouchableOpacity>
        </Card>
      </Box>
    </Modal>
  );

  // ==========================================
  // ESTRUTURA PARA WEB
  // ==========================================
  if (Platform.OS === "web") {
    return (
      <Box
        className={`relative flex-1 min-h-screen transition-colors duration-500 overflow-hidden ${
          isDark ? "bg-[#0d0f17]" : "bg-slate-100"
        }`}
      >
        <EasterEggModal />

        <Box
          className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[rgba(79,70,229,0.2)]" : "bg-[rgba(165,180,252,0.4)]"
          }`}
        />
        <Box
          className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[rgba(14,165,233,0.15)]" : "bg-[rgba(125,211,252,0.3)]"
          }`}
        />

        <Box className="relative z-10 flex-1 flex flex-col min-h-screen">
          <Header />

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <Box className="max-w-[850px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Box
                className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)]"
                    : "bg-[rgba(255,255,255,0.7)] border border-[rgba(0,0,0,0.1)]"
                }`}
              >
                <Box className="flex-row justify-center items-center mb-8">
                  <Box
                    className={`p-2 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                      isDark ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.04)] border-[rgba(0,0,0,0.1)]"
                    }`}
                  >
                    <HStack space="sm" className="items-center justify-center">
                      <NavigateButton route="/" title="Início" />
                      <NavigateButton route="bookmarks" title="Bookmarks" />
                      <NavigateButton route="lists" title="Listas" />
                      <NavigateButton route="about" title="Sobre" />
                    </HStack>
                  </Box>
                </Box>

                <VStack space="xs" className="mb-8">
                  <TouchableOpacity activeOpacity={0.9} onPress={handleSecretTap}>
                    <HStack space="xs" className="items-center">
                      <Heading
                        className={`font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                        size="2xl"
                      >
                        Sobre a Plataforma
                      </Heading>
                      {taps > 0 && (
                        <Text size="xs" className="text-indigo-500 font-bold ml-1">
                          ({taps}/5)
                        </Text>
                      )}
                    </HStack>
                  </TouchableOpacity>
                  <Text className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Conheça a arquitetura e as funcionalidades que tornam a leitura de feeds mais eficiente.
                  </Text>
                </VStack>

                <Card
                  className={`p-6 rounded-3xl border backdrop-blur-md mb-6 ${
                    isDark ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.1)]"
                  }`}
                >
                  <Text
                    className={`text-base leading-relaxed font-normal ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    O **My Feed** é um ecossistema de agregação de notícias e conteúdos RSS/Atom projetado sob medida para entregar alta performance, personalização e foco total na leitura. Desenvolvido sobre uma arquitetura reativa moderna, a plataforma elimina os ruídos visuais tradicionais para oferecer uma experiência contínua e elegante.
                  </Text>
                </Card>

                <VStack space="md" className="mb-8">
                  <Heading
                    size="md"
                    className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}
                  >
                    Recursos Principais
                  </Heading>

                  <VStack space="sm">
                    <Card
                      className={`p-4 rounded-2xl border backdrop-blur-md ${
                        isDark ? "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.01)] border-[rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <HStack space="md" className="items-start">
                        <Box className="p-2.5 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] mt-0.5">
                          <Rss size={18} className="text-indigo-500" />
                        </Box>
                        <VStack className="flex-1">
                          <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                            Leitor Inteligente e Mídia Integrada
                          </Text>
                          <Text className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Parsing dinâmico de feeds com suporte automático para pré-visualização de imagens, players de áudio nativos e podcasts (iTunes Tags).
                          </Text>
                        </VStack>
                      </HStack>
                    </Card>

                    <Card
                      className={`p-4 rounded-2xl border backdrop-blur-md ${
                        isDark ? "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.01)] border-[rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <HStack space="md" className="items-start">
                        <Box className="p-2.5 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] mt-0.5">
                          <FolderTree size={18} className="text-indigo-500" />
                        </Box>
                        <VStack className="flex-1">
                          <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                            Gestão Modular de Listas
                          </Text>
                          <Text className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Crie e gerencie grupos personalizados de fontes RSS para categorizar portais por nicho (Tecnologia, Economia, Esportes) com consumo simplificado.
                          </Text>
                        </VStack>
                      </HStack>
                    </Card>

                    <Card
                      className={`p-4 rounded-2xl border backdrop-blur-md ${
                        isDark ? "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.01)] border-[rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <HStack space="md" className="items-start">
                        <Box className="p-2.5 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] mt-0.5">
                          <Bookmark size={18} className="text-indigo-500" />
                        </Box>
                        <VStack className="flex-1">
                          <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                            Organização de Bookmarks em Pastas
                          </Text>
                          <Text className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Armazene notícias para leitura posterior com organização em diretórios e sincronização direta com a API da aplicação.
                          </Text>
                        </VStack>
                      </HStack>
                    </Card>

                    <Card
                      className={`p-4 rounded-2xl border backdrop-blur-md ${
                        isDark ? "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.01)] border-[rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <HStack space="md" className="items-start">
                        <Box className="p-2.5 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] mt-0.5">
                          <Sparkles size={18} className="text-indigo-500" />
                        </Box>
                        <VStack className="flex-1">
                          <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                            Design System Liquid Glass
                          </Text>
                          <Text className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            Interface responsiva desenvolvida com Tailwind CSS e Gluestack, apresentando desfoque de fundo em tempo real e alternância dinâmica de temas.
                          </Text>
                        </VStack>
                      </HStack>
                    </Card>
                  </VStack>
                </VStack>

                <Box className="pt-6 border-t border-[rgba(255,255,255,0.1)] flex-row justify-between items-center">
                  <HStack space="xs" className="items-center">
                    <ShieldCheck size={14} className={isDark ? "text-slate-400" : "text-slate-600"} />
                    <Text className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      My Feed Engine • v1.0.0
                    </Text>
                  </HStack>
                  <Text className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    React Native & Web
                  </Text>
                </Box>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    );
  }

  // ==========================================
  // ESTRUTURA PARA MOBILE
  // ==========================================
  return (
    <SafeAreaWrapper className={`flex-1 ${isDark ? "bg-[#0b0c10]" : "bg-slate-50"}`}>
      <EasterEggModal />

      <Box className="flex-1 px-6 pt-2">
        <HStack className="items-center mb-4" space="md">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className={`p-3 rounded-full border backdrop-blur-xl ${
              isDark
                ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.18)]"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <ArrowLeft size={20} className={isDark ? "text-white" : "text-slate-800"} />
          </TouchableOpacity>
          <Heading size="lg" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            Sobre a Plataforma
          </Heading>
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <Card
            className={`p-6 rounded-[30px] border mb-6 backdrop-blur-2xl ${
              isDark
                ? "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.2)] shadow-2xl"
                : "bg-white/90 border-slate-200 shadow-md"
            }`}
          >
            <HStack space="md" className="items-center mb-3">
              <TouchableOpacity activeOpacity={0.8} onPress={handleSecretTap}>
                <Box className="w-12 h-12 bg-indigo-600 rounded-2xl justify-center items-center shadow-lg shadow-indigo-500/40">
                  <Layers size={24} className="text-white" />
                </Box>
              </TouchableOpacity>
              <VStack>
                <HStack space="xs" className="items-center">
                  <Heading size="md" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    My Feed
                  </Heading>
                  {taps > 0 && (
                    <Text size="xs" className="text-indigo-500 font-bold ml-1">
                      ({taps}/5)
                    </Text>
                  )}
                </HStack>
                <Text size="xs" className="text-indigo-500 font-semibold">
                  ENGINE V1.0.0
                </Text>
              </VStack>
            </HStack>

            <Text className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              O My Feed é um ecossistema de agregação de notícias e conteúdos RSS/Atom projetado sob medida para entregar alta performance, personalização e foco total na leitura.
            </Text>
          </Card>

          <Heading size="xs" className={`font-bold mb-3 ml-1 tracking-wider ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            RECURSOS PRINCIPAIS
          </Heading>

          <VStack space="sm" className="mb-6">
            <Card
              className={`p-4 rounded-[22px] border backdrop-blur-xl ${
                isDark
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <HStack space="md" className="items-start">
                <Box className={`p-2.5 rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
                  <Rss size={20} className="text-indigo-500" />
                </Box>
                <VStack className="flex-1">
                  <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                    Leitor Inteligente & Mídia
                  </Text>
                  <Text size="xs" className={`mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Parsing dinâmico de feeds com suporte automático para pré-visualização de imagens e podcasts (iTunes Tags).
                  </Text>
                </VStack>
              </HStack>
            </Card>

            <Card
              className={`p-4 rounded-[22px] border backdrop-blur-xl ${
                isDark
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <HStack space="md" className="items-start">
                <Box className={`p-2.5 rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
                  <FolderTree size={20} className="text-indigo-500" />
                </Box>
                <VStack className="flex-1">
                  <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                    Gestão Modular de Listas
                  </Text>
                  <Text size="xs" className={`mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Crie e gerencie grupos personalizados de fontes RSS para categorizar portais por nicho.
                  </Text>
                </VStack>
              </HStack>
            </Card>

            <Card
              className={`p-4 rounded-[22px] border backdrop-blur-xl ${
                isDark
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <HStack space="md" className="items-start">
                <Box className={`p-2.5 rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
                  <Bookmark size={20} className="text-indigo-500" />
                </Box>
                <VStack className="flex-1">
                  <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                    Bookmarks em Pastas
                  </Text>
                  <Text size="xs" className={`mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Armazene notícias para leitura posterior com organização em diretórios e sincronização direta.
                  </Text>
                </VStack>
              </HStack>
            </Card>

            <Card
              className={`p-4 rounded-[22px] border backdrop-blur-xl ${
                isDark
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <HStack space="md" className="items-start">
                <Box className={`p-2.5 rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
                  <Sparkles size={20} className="text-indigo-500" />
                </Box>
                <VStack className="flex-1">
                  <Text className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                    Design Liquid Glass
                  </Text>
                  <Text size="xs" className={`mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Interface responsiva com desfoque de fundo em tempo real e alternância dinâmica de temas.
                  </Text>
                </VStack>
              </HStack>
            </Card>
          </VStack>

          <HStack className="justify-between items-center py-4 px-2 border-t border-[rgba(255,255,255,0.08)]">
            <HStack space="xs" className="items-center">
              <ShieldCheck size={14} className={isDark ? "text-slate-400" : "text-slate-600"} />
              <Text className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                My Feed Engine
              </Text>
            </HStack>
            <Text className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              React Native Mobile
            </Text>
          </HStack>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  );
}