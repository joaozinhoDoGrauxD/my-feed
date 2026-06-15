import { api } from "@/services/api";
import { ContentCheckResult } from "@/types/contentCheck";

export const checkFileType = async (
  url: string | undefined,
): Promise<string | null> => {
  if (!url) return null;
  try {
    const response = await api.post<{ type: string }>("/api/rss/check", {
      url,
    });
    return response.data.type;
  } catch (error) {
    console.error(`Erro ao verificar tipo de arquivo para URL ${url}:`, error);
    return null;
  }
};

export const checkAllContent = async (
  enclosureUrl: string | undefined,
  itunesImageUrl: string | undefined,
  descriptionText: string | undefined,
  contentHtml: string | undefined,
): Promise<ContentCheckResult> => {
  const [mediaType, itunesImageType, descriptionType, contentType] =
    await Promise.all([
      checkFileType(enclosureUrl),
      checkFileType(itunesImageUrl),
      checkFileType(descriptionText),
      checkFileType(contentHtml),
    ]);

  return {
    mediaType,
    itunesImageType,
    descriptionType,
    contentType,
  };
};
