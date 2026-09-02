import React, { useState } from "react";
import { TouchableOpacity, Image, Linking } from "react-native";
import { Card } from "@/gluestack/card";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";
import { HStack } from "@/gluestack/hstack";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import ExternalLinkButton from "@/components/core/buttons/ExternalLinkButton";

export interface ArticleItem {
  url: string;
  title: string;
  description?: string;
  date?: string;
  timestamp?: number;
  source?: string;
  siteId?: string;
  author?: {
    username?: string | string[];
    authorUrl?: string;
    url?: string;
  };
  media?: Array<{
    images?: string[];
    audio?: string[];
  }>;
  sourceType?: string;
  formattedDate?: string;
}

interface RssItemCardProps {
  item: ArticleItem;
}

export default function RssItemCard({ item }: RssItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extrai autor (lidando com string ou array)
  const authorName = Array.isArray(item.author?.username)
    ? item.author?.username.join(", ")
    : item.author?.username;

  // URL do autor (prioriza authorUrl, com fallback para url)
  const authorLink = item.author?.authorUrl || item.author?.url;

  // Extrai imagens/áudios
  const mediaObj = item.media && item.media.length > 0 ? item.media[0] : null;
  const imageUrl = mediaObj?.images && mediaObj.images.length > 0 ? mediaObj.images[0] : null;
  const audioUrl = mediaObj?.audio && mediaObj.audio.length > 0 ? mediaObj.audio[0] : null;

  // Verifica se a descrição possui conteúdo válido
  const hasDescription = Boolean(item.description && item.description.trim().length > 0);

  const handleAuthorClick = () => {
    if (authorLink) {
      Linking.openURL(authorLink).catch((err) =>
        console.error("Erro ao abrir link do autor:", err)
      );
    }
  };

  const toggleExpand = () => {
    if (hasDescription) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <Card className="p-5 rounded-3xl bg-card border border-border mb-4 shadow-sm">
      <VStack space="md">

        {authorName && (
          <TouchableOpacity
            activeOpacity={authorLink ? 0.7 : 1}
            onPress={handleAuthorClick}
            disabled={!authorLink}
            className="self-start"
          >
            <Text className="text-foreground font-bold text-base">
              {authorName}
            </Text>
          </TouchableOpacity>
        )}

        {imageUrl && (
          <Box className="w-full bg-secondary rounded-2xl overflow-hidden border border-border">
            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", aspectRatio: 16 / 9 }}
              resizeMode="contain"
            />
          </Box>
        )}

        {/* Mídia Áudio */}
        {audioUrl && !imageUrl && (
          <Box className="w-full p-4 bg-secondary rounded-2xl border border-border items-center justify-center">
            <Text size="xs" className="text-muted-foreground font-medium">
              🎵 Áudio disponível: {audioUrl}
            </Text>
          </Box>
        )}

        {/* Título com Seta Indicadora para Descrição */}
        <TouchableOpacity
          activeOpacity={hasDescription ? 0.7 : 1}
          onPress={toggleExpand}
          disabled={!hasDescription}
        >
          <HStack className="justify-between items-center gap-2">
            <Heading size="md" className="text-foreground font-bold flex-1">
              {item.title}
            </Heading>
            {hasDescription && (
              <Box className="p-1">
                {isExpanded ? (
                  <ChevronUp size={20} className="text-foreground" />
                ) : (
                  <ChevronDown size={20} className="text-muted-foreground" />
                )}
              </Box>
            )}
          </HStack>
        </TouchableOpacity>

        {isExpanded && hasDescription && (
          <Text className="text-muted-foreground text-sm leading-relaxed mt-1">
            {item.description?.replace(/<[^>]*>?/gm, "")}
          </Text>
        )}

        <HStack className="justify-between items-end mt-2">
          <VStack className="flex-1 mr-2">
            <Text size="xs" className="text-muted-foreground opacity-80">
              {item.formattedDate || item.date}
            </Text>
          </VStack>

          <ExternalLinkButton url={item.url} source={item.source} />
        </HStack>
      </VStack>
    </Card>
  );
}