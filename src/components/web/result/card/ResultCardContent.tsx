import React from "react";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Button, ButtonText } from "@/gluestack/button";
import ResultCardHtml from "./medias/ResultCardHtml";
import { Article } from "@/types/article.types";
import { ExternalLink, Newspaper } from "lucide-react-native";
import { Linking } from "react-native";
import useTheme from "@/hooks/useTheme";

interface ResultCardContentProps {
  item: Article & { summary?: string; snippet?: string; link?: string; url?: string };
  descriptionText: string;
  descriptionType: string | null;
  contentType: string | null;
  width: number;
}

const ResultCardContent: React.FC<ResultCardContentProps> = ({
  item,
  descriptionText,
  descriptionType,
  contentType,
  width,
}) => {
  const { isDark } = useTheme();

  const rawText =
    descriptionText ||
    item.content ||
    item.description ||
    item.summary ||
    item.snippet ||
    "";

  const articleUrl = item.link || item.url || (item as any).guid;
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(rawText) || descriptionType === "It's a HTML file";

  return (
    <Box className="gap-4">
      {rawText ? (
        isHtml ? (
          <ResultCardHtml htmlContent={rawText} contentWidth={width - 60} />
        ) : (
          <Text
            size="md"
            className={`leading-relaxed font-normal my-1 ${
              isDark ? "text-slate-200/90" : "text-slate-800"
            }`}
          >
            {rawText}
          </Text>
        )
      ) : (
        /* Pré-visualização elegante */
        <Box
          className={`p-4 rounded-2xl border backdrop-blur-md flex-row items-center gap-4 my-1 ${
            isDark
              ? "bg-white/[0.04] border-white/10"
              : "bg-black/[0.03] border-black/10"
          }`}
        >
          <Box className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-400/30">
            <Newspaper size={24} className={isDark ? "text-indigo-300" : "text-indigo-600"} />
          </Box>
          <Box className="flex-1">
            <Text
              size="sm"
              bold
              className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Pré-visualização resumida
            </Text>
            <Text
              size="xs"
              className={`mt-0.5 ${isDark ? "text-slate-300/80" : "text-slate-600"}`}
            >
              Este veículo disponibiliza a leitura completa diretamente na fonte oficial.
            </Text>
          </Box>
        </Box>
      )}

      {/* Botão de ação */}
      {articleUrl && (
        <Box
          className={`mt-1 pt-3 border-t flex-row justify-end ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl px-5 py-2.5 border border-indigo-400/30 backdrop-blur-xl shadow-[0_4px_15px_rgba(79,70,229,0.3)] flex-row items-center gap-2 transition-all duration-300"
            onPress={() => Linking.openURL(articleUrl)}
          >
            <ButtonText className="text-white font-medium text-xs tracking-wide">
              Ler notícia completa
            </ButtonText>
            <ExternalLink size={14} className="text-white" />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ResultCardContent;