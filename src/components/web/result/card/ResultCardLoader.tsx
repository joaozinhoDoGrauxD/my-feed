import React from "react";
import { Box } from "@/gluestack/box";
import { Spinner } from "@/gluestack/spinner";

const ResultCardLoader: React.FC = () => {
  return (
    <Box className="py-5 items-center justify-center">
      <Spinner size="small" />
    </Box>
  );
};

export default ResultCardLoader;
