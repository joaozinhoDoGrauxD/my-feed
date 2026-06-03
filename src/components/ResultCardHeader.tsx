import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ResultCardHeaderProps } from "@/types/result.types";
import { formatPublishedDate } from "../services/formatDateService";

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  title,
  author = "Autor Desconhecido",
  publishedDate,
  onPress,
}) => {
  const formattedDate = formatPublishedDate(publishedDate);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.headerArea}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>
        {author} {formattedDate ? `• ${formattedDate}` : ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerArea: { padding: 20 },
  title: {
    fontSize: 18,
    color: "#fafafa",
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 26,
  },
  meta: {
    fontSize: 13,
    color: "#a1a1aa",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});

export default ResultCardHeader;
