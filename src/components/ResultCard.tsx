import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AudioPlayer from "./AudioPlayer";
import ResultCardHeader from "@/components/ResultCardHeader";
import ResultCardImage from "@/components/ResultCardImage";
import ResultCardHtml from "@/components/ResultCardHtml";
import { ResultCardProps } from "@/types/result.types";

const ResultCard: React.FC<ResultCardProps> = ({
  item,
  isExpanded,
  onPress,
  width,
  checkedTypes,
}) => {
  const [lastExpanded, setLastExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isExpanded !== lastExpanded) {
    setLastExpanded(isExpanded);
    if (isExpanded) {
      setIsLoading(true);
    }
  }

  const descriptionText = item.description || item.content || "";

  const mediaType = item.enclosures?.[0]?.url
    ? checkedTypes[item.enclosures[0].url] || null
    : null;
  const itunesImageType = item.itunes?.image
    ? checkedTypes[item.itunes.image] || null
    : null;
  const descriptionType = descriptionText
    ? checkedTypes[descriptionText] || null
    : null;
  const contentType = item.content ? checkedTypes[item.content] || null : null;

  useEffect(() => {
    if (isExpanded && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isLoading]);

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
