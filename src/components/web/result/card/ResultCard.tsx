import React, { useState, useEffect } from "react";
import { Box } from "@/gluestack/box";
import { Card } from "@/gluestack/card";
import ResultCardHeader from "./ResultCardHeader";
import ResultCardLoader from "./ResultCardLoader";
import ResultCardMedia from "./medias/ResultCardMedia";
import ResultCardContent from "./ResultCardContent";
import ResultCardAudio from "./medias/ResultCardAudio";
import { ResultCardProps } from "@/types/result.types";
import useTheme from "@/hooks/useTheme";

const ResultCard: React.FC<ResultCardProps> = ({
  item,
  isExpanded,
  onPress,
  width,
  checkedTypes,
}) => {
  const [lastExpanded, setLastExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

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
    <Card
      className={`mb-6 overflow-hidden p-0 gap-0 rounded-3xl backdrop-blur-2xl transition-all duration-500 ease-in-out ${
        isDark
          ? "border border-white/15 bg-slate-900/60 hover:bg-slate-900/80 shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
          : "border border-slate-200/80 bg-white/90 hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      }`}
    >
      <ResultCardHeader
        title={item.title}
        author={item.authors?.[0]?.name}
        publishedDate={item.published}
        onPress={onPress}
      />

      {isExpanded && (
        <Box
          className={`p-6 border-t backdrop-blur-xl transition-all duration-300 ${
            isDark
              ? "border-white/10 bg-black/20"
              : "border-slate-100 bg-slate-50/60"
          }`}
        >
          {isLoading ? (
            <ResultCardLoader />
          ) : (
            <>
              <ResultCardMedia
                item={item}
                mediaType={mediaType}
                itunesImageType={itunesImageType}
              />

              <ResultCardContent
                item={item}
                descriptionText={descriptionText}
                descriptionType={descriptionType}
                contentType={contentType}
                width={width}
              />

              <ResultCardAudio item={item} mediaType={mediaType} />
            </>
          )}
        </Box>
      )}
    </Card>
  );
};

export default ResultCard;