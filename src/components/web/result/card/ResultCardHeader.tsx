import React from "react";
import { ResultCardHeaderProps } from "@/types/result.types";
import { Pressable } from "@/gluestack/pressable";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  title,
  author = "Autor Desconhecido",
  publishedDate,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} className="p-5">
      <VStack space="xs">
        <Text size="lg" bold className="text-typography-900 leading-snug">
          {title}
        </Text>
        <Text size="xs" className="text-typography-500 uppercase tracking-wider font-semibold">
          {author ? author : ""} {publishedDate ? `• ${publishedDate}` : ""}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default ResultCardHeader;
