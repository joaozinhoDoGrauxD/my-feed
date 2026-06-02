import { Article } from "./article.types";

export interface ResultProps {
  data: Article[];
}

export interface ResultCardProps {
  item: Article;
  isExpanded: boolean;
  onPress: () => void;
  width: number;
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
