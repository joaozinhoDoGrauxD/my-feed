import React from "react";
import { Box } from "@/gluestack/box";
import RenderHtml from "react-native-render-html";
import { ResultCardHtmlProps } from "@/types/result.types";
import useTheme from "@/hooks/useTheme";

const ResultCardHtml: React.FC<ResultCardHtmlProps> = ({
  htmlContent,
  contentWidth,
  isDivider = false,
}) => {
  const { isDark } = useTheme();

  const htmlBaseStyle = {
    color: isDark ? "#d4d4d8" : "#27272a",
    fontSize: 15,
    lineHeight: 24,
  };

  return (
    <Box className={isDivider ? "mt-4 pt-4 border-t border-outline-300" : ""}>
      <RenderHtml
        contentWidth={contentWidth}
        source={{ html: htmlContent }}
        baseStyle={htmlBaseStyle}
      />
    </Box>
  );
};

export default ResultCardHtml;
