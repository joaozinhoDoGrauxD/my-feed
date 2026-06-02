import React from "react";
import { View, StyleSheet } from "react-native";
import RenderHtml from "react-native-render-html";
import { ResultCardHtmlProps } from "@/types/result.types";

const htmlBaseStyle = {
  color: "#d4d4d8",
  fontSize: 15,
  lineHeight: 24,
};

const ResultCardHtml: React.FC<ResultCardHtmlProps> = ({
  htmlContent,
  contentWidth,
  isDivider = false,
}) => {
  if (isDivider) {
    return (
      <View style={styles.contentDivider}>
        <RenderHtml
          contentWidth={contentWidth}
          source={{ html: htmlContent }}
          baseStyle={htmlBaseStyle}
        />
      </View>
    );
  }

  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={{ html: htmlContent }}
      baseStyle={htmlBaseStyle}
    />
  );
};

const styles = StyleSheet.create({
  contentDivider: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#27272a",
  },
});

export default ResultCardHtml;
