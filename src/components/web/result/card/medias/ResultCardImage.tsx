import React from "react";
import { ResultCardImageProps } from "@/types/result.types";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { Image } from "@/gluestack/image";

const ResultCardImage: React.FC<ResultCardImageProps> = ({ uri }) => {
  return (
    <Box className="mb-4 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
      <Center>
        <Image 
          className="rounded-2xl w-full h-64" 
          resizeMode="cover"
          source={{ uri: uri }}
          alt="Media content"
        />
      </Center>
    </Box>
  );
};

export default ResultCardImage;