import { Article } from "@/types/article.types";

export interface ResultProps {
  data: Article[];
  checkedTypes: Record<string, string>;
}

export interface ResultCardProps {
  item: Article;
  isExpanded: boolean;
  onPress: () => void;
  width: number;
  checkedTypes: Record<string, string>;
}

export interface ResultCardHeaderProps {
  title: string;
  author?: string;
  publishedDate?: string;
  onPress: () => void;
}

export interface ResultCardImageProps {
  uri: string;
}

export interface ResultCardHtmlProps {
  htmlContent: string;
  contentWidth: number;
  isDivider?: boolean;
}
