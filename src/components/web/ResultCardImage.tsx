import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { ResultCardImageProps } from "@/types/result.types";

const ResultCardImage: React.FC<ResultCardImageProps> = ({ uri }) => {
  return (
    <View className="mb-4 w-full items-center">
      <Image className="w-full h-[300px] rounded-xl" source={{ uri }} />
    </View>
  );
};

export default ResultCardImage;
