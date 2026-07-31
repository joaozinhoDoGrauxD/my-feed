import { ReactNode, useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Result from "./Result";
import { Article } from "@/types/article.types";
import { api } from "@/services/api";
import { checkAllContent } from "@/services/contentCheckService";

const Input = (): ReactNode => {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Article[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="flex-1 pt-6">
      <View className="px-6 mb-2">
        <TextInput
          className="bg-[#18181b] text-[#fafafa] rounded-2xl px-5 py-4 text-base mb-4 border border-[#27272a]"
          placeholder="Cole a URL do feed RSS..."
          placeholderTextColor="#71717a"
          onChangeText={setUrl}
          defaultValue={url}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />
        <TouchableOpacity
          className="bg-purple-600 rounded-2xl py-4 items-center justify-center shadow-[0px_4px_8px_rgba(99,102,241,0.3)] elevation-4"
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={async () => {
            setIsLoading(true);
            try {
              const response = await api.post<Article[]>("/api/rss/items", {
                url,
              });
              setItems(response.data);
              const types = await checkAllContent(url);
              setCheckedTypes(types);
            } catch (error) {
              console.error("Erro ao buscar feed:", error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-base font-bold tracking-[0.5px]">Buscar feed</Text>
          )}
        </TouchableOpacity>
      </View>
      <Result data={items} checkedTypes={checkedTypes} />
    </View>
  );
};

export default Input;
