import React from "react";
import { ResultCardImageProps } from "@/types/result.types";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { Image } from "@/gluestack/image";

const ResultCardImage: React.FC<ResultCardImageProps> = ({ uri }) => {
  return (
    <Box className="mb-4">
      <Center>
        <Image className="roundend" size="2xl" source={{uri: uri}}/>
      </Center>
    </Box>
  );
};

export default ResultCardImage;
