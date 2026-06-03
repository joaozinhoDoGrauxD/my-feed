import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AudioPlayer from "./AudioPlayer";
import ResultCardHeader from "./ResultCardHeader";
import ResultCardImage from "./ResultCardImage";
import ResultCardHtml from "./ResultCardHtml";
import { ResultCardProps } from "@/types/result.types";
import { hasHTML, hasAudio, hasImage } from "../services/contentCheckService";

const ResultCard: React.FC<ResultCardProps> = ({
  item,
  isExpanded,
  onPress,
  width,
}) => {
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
          {item.enclosures?.[0]?.url !== undefined &&
            hasImage(item.enclosures?.[0]?.url) && (
              <ResultCardImage uri={item.enclosures[0].url} />
            )}

          {item.itunes?.image !== undefined && hasImage(item.itunes?.image) && (
            <ResultCardImage uri={item.itunes.image} />
          )}

          {hasHTML(item.description) ? (
            <ResultCardHtml
              htmlContent={item.description}
              contentWidth={width - 60}
            />
          ) : (
            <Text style={styles.description}>{item.description}</Text>
          )}

          {item.content !== undefined && hasHTML(item.content) && (
            <ResultCardHtml
              htmlContent={item.content}
              contentWidth={width - 90}
              isDivider
            />
          )}

          {item.enclosures?.[0]?.url !== undefined &&
            hasAudio(item.enclosures?.[0]?.url) && (
              <AudioPlayer url={item.enclosures[0].url} title={item.title} />
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
});

export default ResultCard;
