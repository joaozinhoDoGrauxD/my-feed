import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AudioPlayer from "./AudioPlayer";
import ResultCardHeader from "./ResultCardHeader";
import ResultCardImage from "./ResultCardImage";
import ResultCardHtml from "./ResultCardHtml";
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
    <View className="bg-[#18181b] rounded-[20px] mb-5 border border-[#27272a] shadow-[0px_6px_8px_rgba(0,0,0,0.2)] elevation-5 overflow-hidden">
      <ResultCardHeader
        title={item.title}
        author={item.authors?.[0]?.name}
        publishedDate={item.published}
        onPress={onPress}
      />

      {isExpanded && (
        <View className="p-5 bg-[#18181b] border-t border-[#27272a]">
          {isLoading ? (
            <View className="py-5 items-center justify-center">
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
                  <Text className="text-[15px] text-[#d4d4d8] leading-6">{descriptionText}</Text>
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

export default ResultCard;
