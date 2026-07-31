import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ResultCardHeaderProps } from "@/types/result.types";

const ResultCardHeader: React.FC<ResultCardHeaderProps> = ({
  title,
  author = "Autor Desconhecido",
  publishedDate,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="p-5"
    >
      <Text className="text-[18px] text-[#fafafa] font-bold mb-2 leading-[26px]">{title}</Text>
      <Text className="text-[13px] text-[#a1a1aa] font-semibold uppercase tracking-[0.8px]">
        {author ? author : ""} {publishedDate ? `• ${publishedDate}` : ""}
      </Text>
    </TouchableOpacity>
  );
};

export default ResultCardHeader;
