import React from "react";
import AudioPlayer from "../../../player/AudioPlayer";
import { Article } from "@/types/article.types";

interface ResultCardAudioProps {
  item: Article;
  mediaType: string | null;
}

const ResultCardAudio: React.FC<ResultCardAudioProps> = ({ item, mediaType }) => {
  if (!!item.enclosures?.[0]?.url && mediaType === "It's a audio file") {
    return <AudioPlayer url={item.enclosures[0].url} title={item.title} />;
  }
  return null;
};

export default ResultCardAudio;
