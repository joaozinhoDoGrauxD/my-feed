import React, { useState, useEffect } from "react";
import { Box } from "@/gluestack/box";
import { Card } from "@/gluestack/card";
import ResultCardHeader from "./ResultCardHeader";
import ResultCardLoader from "./ResultCardLoader";
import ResultCardMedia from "./medias/ResultCardMedia";
import ResultCardContent from "./ResultCardContent";
import ResultCardAudio from "./medias/ResultCardAudio";
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
    <Card className="mb-5 overflow-hidden p-0 gap-0 border-outline-200">
      <ResultCardHeader
        title={item.title}
        author={item.authors?.[0]?.name}
        publishedDate={item.published}
        onPress={onPress}
      />

      {isExpanded && (
        <Box className="p-5 border-t border-outline-200 bg-background-50">
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
