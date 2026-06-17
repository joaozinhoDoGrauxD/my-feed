import { api } from "@/services/api";

export const checkAllContent = async (
  url: string | undefined,
): Promise<Record<string, string>> => {
  if (!url) return {};
  try {
    const response = await api.post<{
      checkedTypes: Record<string, string>;
    }>("/api/rss/check", {
      url,
    });
    return response.data.checkedTypes || {};
  } catch (error) {
    console.error(`Erro ao verificar tipo de arquivo para URL ${url}:`, error);
    return {};
  }
};
