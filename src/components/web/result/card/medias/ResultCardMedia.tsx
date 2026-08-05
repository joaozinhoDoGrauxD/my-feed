import React from "react";
import ResultCardImage from "./ResultCardImage";
import { Article } from "@/types/article.types";

interface ResultCardMediaProps {
  item: Article;
  mediaType: string | null;
  itunesImageType: string | null;
}

const ResultCardMedia: React.FC<ResultCardMediaProps> = ({
  item,
  mediaType,
  itunesImageType,
}) => {
  return (
    <>
      {!!item.enclosures?.[0]?.url && mediaType === "It's a image file" && (
        <ResultCardImage uri={item.enclosures[0].url} />
      )}

      {!!item.itunes?.image && itunesImageType === "It's a image file" && (
        <ResultCardImage uri={item.itunes.image} />
      )}
    </>
  );
};

export default ResultCardMedia;
