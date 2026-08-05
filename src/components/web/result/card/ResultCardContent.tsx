import React from "react";
import { Text } from "@/gluestack/text";
import ResultCardHtml from "./medias/ResultCardHtml";
import { Article } from "@/types/article.types";

interface ResultCardContentProps {
  item: Article;
  descriptionText: string;
  descriptionType: string | null;
  contentType: string | null;
  width: number;
}

const ResultCardContent: React.FC<ResultCardContentProps> = ({
  item,
  descriptionText,
  descriptionType,
  contentType,
  width,
}) => {
  return (
    <>
      {descriptionType === "It's a HTML file" ||
      (descriptionType === null && /<\/?[a-z][\s\S]*>/i.test(descriptionText)) ? (
        <ResultCardHtml htmlContent={descriptionText} contentWidth={width - 60} />
      ) : (
        !!descriptionText && (
          <Text size="md" className="text-typography-700 leading-relaxed">
            {descriptionText}
          </Text>
        )
      )}

      {!!item.description &&
        !!item.content &&
        (contentType === "It's a HTML file" ||
          (contentType === null && /<\/?[a-z][\s\S]*>/i.test(item.content))) && (
          <ResultCardHtml htmlContent={item.content} contentWidth={width - 90} isDivider />
        )}
    </>
  );
};

export default ResultCardContent;
