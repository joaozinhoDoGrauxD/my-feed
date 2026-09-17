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

  const textColor = isDark ? "#e2e8f0" : "#1e293b";
  const headingColor = isDark ? "#ffffff" : "#0f172a";
  const linkColor = isDark ? "#818cf8" : "#4f46e5";

  const htmlBaseStyle = {
    color: textColor,
    fontSize: 15,
    lineHeight: 24,
  };

  const tagsStyles = {
    p: { color: textColor, marginBottom: 12 },
    a: { color: linkColor, textDecorationLine: "underline" },
    strong: { color: headingColor, fontWeight: "bold" },
    h1: { color: headingColor, fontWeight: "bold" },
    h2: { color: headingColor, fontWeight: "bold" },
    h3: { color: headingColor, fontWeight: "bold" },
  } as const;

  return (
    <Box
      className={
        isDivider
          ? `mt-4 pt-4 border-t ${isDark ? "border-white/10" : "border-black/10"}`
          : ""
      }
    >
      <RenderHtml
        contentWidth={contentWidth}
        source={{ html: htmlContent }}
        baseStyle={htmlBaseStyle}
        tagsStyles={tagsStyles}
      />
    </Box>
  );
};

export default ResultCardHtml;