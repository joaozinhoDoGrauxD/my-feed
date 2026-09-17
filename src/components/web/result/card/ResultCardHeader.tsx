import React from "react";
import { ResultCardHeaderProps } from "@/types/result.types";
import { Pressable } from "@/gluestack/pressable";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";
import { Box } from "@/gluestack/box";
import { User, Calendar } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  title,
  author = "Autor Desconhecido",
  publishedDate,
  onPress,
}) => {
  const { isDark } = useTheme();
  const displayAuthor = author && author.trim() !== "" ? author : "Autor não informado";

  return (
    <Pressable 
      onPress={onPress} 
      className={`p-6 transition-colors duration-200 ${
        isDark ? "active:bg-white/[0.04]" : "active:bg-black/[0.04]"
      }`}
    >
      <VStack space="md">
        <Text
          size="lg"
          bold
          className={`font-bold leading-snug tracking-tight drop-shadow-sm ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </Text>
        
        <Box className="flex-row items-center gap-3">
          {/* Badge de Autor em Vidro */}
          <Box
            className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg border backdrop-blur-md ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            <User size={12} className={isDark ? "text-indigo-300" : "text-indigo-600"} />
            <Text
              size="xs"
              className={`font-medium text-[11px] ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {displayAuthor}
            </Text>
          </Box>

          {/* Badge de Data se disponível */}
          {publishedDate && (
            <Box
              className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                isDark
                  ? "bg-white/[0.02] border-white/5"
                  : "bg-black/[0.02] border-black/5"
              }`}
            >
              <Calendar size={12} className={isDark ? "text-slate-400" : "text-slate-500"} />
              <Text
                size="xs"
                className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {publishedDate}
              </Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Pressable>
  );
};

export default ResultCardHeader;