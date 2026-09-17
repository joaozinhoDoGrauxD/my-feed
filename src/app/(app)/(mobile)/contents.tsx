import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { VStack } from "@/gluestack/vstack";
import { Spinner } from "@/gluestack/spinner";
import { Center } from "@/components/ui/center";
import { Rss, ArrowLeft } from "lucide-react-native";
import { api } from "@/services/api";
import RssItemCard, { ArticleItem } from "@/components/rss/RssItemCard";
import { useRoute, useRouter } from "expo-router";
import useTheme from "@/hooks/useTheme";

export default function ListContentPage() {
  const router = useRouter();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();

  const params = (route.params as any) || {};
  const title = params.title || "Lista";

  let urls: string[] = [];
  if (params.urls) {
    if (typeof params.urls === "string") {
      try {
        urls = JSON.parse(params.urls);
      } catch (e) {
        console.error("Erro ao fazer parse das urls:", e);
      }
    } else if (Array.isArray(params.urls)) {
      urls = params.urls;
    }
  }

  const [items, setItems] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListItems = async () => {
      if (!urls || urls.length === 0) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await api.post<ArticleItem[]>("/rss/items", { urls });
        setItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar itens da lista:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListItems();
  }, [urls]);

  const paddingHorizontal = width < 380 ? 16 : 24;

  return (
    <SafeAreaWrapper className={`flex-1 ${isDark ? "bg-[#0b0c10]" : "bg-slate-50"}`}>
      <Box className="flex-1 pt-4" style={{ paddingHorizontal }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (router.canGoBack() ? router.back() : router.navigate("/lists"))}
          className="mb-4 py-2 self-start flex-row items-center gap-2"
        >
          <ArrowLeft size={18} className={isDark ? "text-slate-300" : "text-slate-700"} />
          <Text className={`font-semibold text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Heading size="xl" className={`font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </Heading>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" />
          </Center>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <VStack space="md" className="pb-28 max-w-[650px] mx-auto w-full">
              {items.length === 0 ? (
                <Card
                  className={`p-8 rounded-3xl backdrop-blur-2xl border justify-center items-center py-12 ${
                    isDark
                      ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.1)]"
                      : "bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.06)] shadow-sm"
                  }`}
                >
                  <Rss size={48} className="text-indigo-500 opacity-60 mb-3" />
                  <Text className={`text-center font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Nenhum item encontrado nesta lista.
                  </Text>
                </Card>
              ) : (
                items.map((item, index) => (
                  <RssItemCard key={item.siteId || index.toString()} item={item} />
                ))
              )}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </SafeAreaWrapper>
  );
}