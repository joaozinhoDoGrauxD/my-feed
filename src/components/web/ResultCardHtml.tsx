import React from "react";
import { View } from "react-native";
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
      <View className="mt-4 pt-4 border-t border-[#27272a]">
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

export default ResultCardHtml;
