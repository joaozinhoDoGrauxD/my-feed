import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AudioPlayer from "./AudioPlayer";
import ResultCardHeader from "@/components/ResultCardHeader";
import ResultCardImage from "@/components/ResultCardImage";
import ResultCardHtml from "@/components/ResultCardHtml";
import { ResultCardProps } from "@/types/result.types";
import { checkAllContent } from "@/services/contentCheckService";

const ResultCard: React.FC<ResultCardProps> = ({
  item,
  isExpanded,
  onPress,
  width,
}) => {
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [itunesImageType, setItunesImageType] = useState<string | null>(null);
  const [descriptionType, setDescriptionType] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const descriptionText = item.description || item.content || "";

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    let isMounted = true;

    const loadContentAndMedia = async () => {
      setIsLoading(true);
      try {
        const result = await checkAllContent(
          item.enclosures?.[0]?.url,
          item.itunes?.image,
          descriptionText,
          item.content,
        );

        if (isMounted) {
          setMediaType(result.mediaType);
          setItunesImageType(result.itunesImageType);
          setDescriptionType(result.descriptionType);
          setContentType(result.contentType);
        }
      } catch (error) {
        console.error("Erro ao carregar os conteúdos da mídia:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContentAndMedia();

    return () => {
      isMounted = false;
    };
  }, [isExpanded, item, descriptionText]);

  return (
    <View style={styles.card}>
      <ResultCardHeader
        title={item.title}
        author={item.authors?.[0]?.name}
        publishedDate={item.published}
        onPress={onPress}
      />

      {isExpanded && (
        <View style={styles.descriptionBox}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fafafa" />
            </View>
          ) : (
            <>
              {!!item.enclosures?.[0]?.url &&
                mediaType === "It's a image file" && (
                  <ResultCardImage uri={item.enclosures[0].url} />
                )}

              {!!item.itunes?.image &&
                itunesImageType === "It's a image file" && (
                  <ResultCardImage uri={item.itunes.image} />
                )}
load
              {descriptionType === "It's a HTML file" ||
              (descriptionType === null &&
                /<\/?[a-z][\s\S]*>/i.test(descriptionText)) ? (
                <ResultCardHtml
                  htmlContent={descriptionText}
                  contentWidth={width - 60}
                />
              ) : (
                !!descriptionText && (
                  <Text style={styles.description}>{descriptionText}</Text>
                )
              )}

              {!!item.description &&
                !!item.content &&
                (contentType === "It's a HTML file" ||
                  (contentType === null &&
                    /<\/?[a-z][\s\S]*>/i.test(item.content))) && (
                  <ResultCardHtml
                    htmlContent={item.content}
                    contentWidth={width - 90}
                    isDivider
                  />
                )}

              {!!item.enclosures?.[0]?.url &&
                mediaType === "It's a audio file" && (
                  <AudioPlayer
                    url={item.enclosures[0].url}
                    title={item.title}
                  />
                )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18181b",
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#27272a",
    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
    elevation: 5,
    overflow: "hidden",
  },
  descriptionBox: {
    padding: 20,
    backgroundColor: "#18181b",
    borderTopWidth: 1,
    borderTopColor: "#27272a",
  },
  description: { fontSize: 15, color: "#d4d4d8", lineHeight: 24 },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ResultCard;
