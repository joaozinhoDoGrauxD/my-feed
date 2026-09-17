import React, { useState } from "react";
import { TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import { VStack } from "@/gluestack/vstack";
import { Rss, Plus, Trash2, Globe } from "lucide-react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import { api } from "@/services/api";
import { Article } from "@/types/article.types";
import useTheme from "@/hooks/useTheme";

export default function RssPage() {
  const [feedUrl, setFeedUrl] = useState("");
  const [feeds, setFeeds] = useState<{ id: string; title: string; url: string; count: number }[]>([]);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const handleAddFeed = async () => {
    if (feedUrl) {
      try {
        const response = await api.post<Article[]>("/rss/items", { feedUrl });
        console.log(response.data);
      } catch (err) {
        console.error("Error no fetch", err);
      }
    }
  };

  const handleDeleteFeed = (id: string) => {
    setFeeds(feeds.filter((feed) => feed.id !== id));
  };

  const inputHeight = width < 380 ? 46 : 52;

  return (
    <SafeAreaWrapper className={`flex-1 ${isDark ? "bg-[#0b0c10]" : "bg-slate-50"}`}>
      <Box className="flex-1 px-6 pt-4">
        <HStack className="justify-between items-center mb-6">
          <Heading size="xl" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            Feeds RSS
          </Heading>
        </HStack>

        {/* Input de URL Responsivo e Formato Pílula (rounded-full) */}
        <HStack className="mb-6 items-center" space="sm">
          <Box
            style={{ height: inputHeight }}
            className={`flex-1 border rounded-full px-5 justify-center backdrop-blur-md ${
              isDark
                ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)]"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <TextInput
              value={feedUrl}
              onChangeText={setFeedUrl}
              placeholder="Inserir URL do Feed RSS..."
              placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
              className={`text-sm flex-1 font-medium ${isDark ? "text-white" : "text-slate-900"}`}
              autoCapitalize="none"
              keyboardType="url"
            />
          </Box>

          {/* Botão Totalmente Redondo (rounded-full) */}
          <TouchableOpacity
            onPress={handleAddFeed}
            activeOpacity={0.8}
            style={{ width: inputHeight, height: inputHeight }}
            className="bg-indigo-600 rounded-full justify-center items-center shadow-md active:opacity-80"
          >
            <Plus size={22} className="text-white" />
          </TouchableOpacity>
        </HStack>

        {/* Lista de Feeds com padding inferior dinamico usando insets */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          className="flex-1"
        >
          <VStack space="md">
            <Text className="text-indigo-500 font-semibold text-xs uppercase tracking-wider mb-1">
              Meus Feeds ({feeds.length})
            </Text>

            {feeds.length === 0 ? (
              <Card
                className={`p-8 rounded-[28px] border justify-center items-center py-12 backdrop-blur-2xl ${
                  isDark
                    ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.1)]"
                    : "bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.06)] shadow-sm"
                }`}
              >
                <Rss size={48} className="text-indigo-500 opacity-60 mb-3" />
                <Text className={`text-center font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Nenhum feed cadastrado ainda. Adicione uma URL acima!
                </Text>
              </Card>
            ) : (
              feeds.map((feed) => (
                <Card
                  key={feed.id}
                  className={`p-4 rounded-[24px] border flex-row items-center justify-between backdrop-blur-md ${
                    isDark
                      ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]"
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <HStack space="md" className="flex-1 items-center">
                    <Box className="w-10 h-10 bg-indigo-500/10 rounded-full justify-center items-center border border-indigo-500/20">
                      <Rss size={18} className="text-indigo-500" />
                    </Box>
                    <VStack className="flex-1">
                      <Heading size="sm" className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`} numberOfLines={1}>
                        {feed.title}
                      </Heading>
                      <HStack space="xs" className="items-center">
                        <Globe size={11} className={isDark ? "text-slate-400" : "text-slate-500"} />
                        <Text size="xs" className={isDark ? "text-slate-400" : "text-slate-500"} numberOfLines={1}>
                          {feed.url}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center ml-2">
                    <Box className="bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      <Text size="xs" className="text-indigo-500 font-bold">
                        {feed.count} arts
                      </Text>
                    </Box>
                    <TouchableOpacity
                      onPress={() => handleDeleteFeed(feed.id)}
                      activeOpacity={0.7}
                      className="w-8 h-8 rounded-full justify-center items-center active:bg-red-500/10"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </TouchableOpacity>
                  </HStack>
                </Card>
              ))
            )}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  );
}