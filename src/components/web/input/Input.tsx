import { ReactNode, useState } from "react";
import { Box } from "@/gluestack/box";
import { HStack } from "@/gluestack/hstack";
import { Button, ButtonSpinner, ButtonText } from "@/gluestack/button";
import { Search } from "lucide-react-native";
import { Input, InputField, InputSlot, InputIcon } from "@/gluestack/input";
import Result from "../result/Result";
import { Article } from "@/types/article.types";
import { api } from "@/services/api";
import NavigateButton from "@/components/core/buttons/NavigateButton";
import { checkAllContent } from "@/services/contentCheckService";
import useTheme from "@/hooks/useTheme";

const MyInput = (): ReactNode => {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Article[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      {/* Centered Navigation Pills Bar */}
      <Box className="flex-row justify-center items-center mb-10">
        <Box
          className={`p-2 rounded-2xl border backdrop-blur-xl shadow-inner transition-all duration-300 ${
            isDark ? "bg-white/[0.05] border-white/10" : "bg-black/[0.04] border-black/10"
          }`}
        >
          <HStack space="sm" className="items-center justify-center">
            <NavigateButton route="bookmarks" title="Bookmarks" />
            <NavigateButton route="lists" title="Listas" />
            <NavigateButton route="about" title="Sobre" />
          </HStack>
        </Box>
      </Box>

      {/* Search Bar Section */}
      <Box>
        <Box className="mb-8 flex-row gap-3 items-center">
          <Box className="flex-1">
            <Input
              className={`h-14 rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${
                isDark
                  ? "border-white/15 bg-white/[0.06] focus:border-indigo-400/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                  : "border-slate-300 bg-white focus:border-indigo-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
              }`}
            >
              <InputField
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                onChangeText={setUrl}
                defaultValue={url}
                placeholder="Cole a URL do Feed Rss..."
                placeholderTextColor={isDark ? "rgba(255, 255, 255, 0.4)" : "#94a3b8"}
                className={`font-medium px-4 ${isDark ? "text-white" : "text-slate-900"}`}
              />
              <InputSlot className="pr-4">
                <InputIcon as={Search} className={isDark ? "text-slate-300/70" : "text-slate-500"} />
              </InputSlot>
            </Input>
          </Box>

          <Button
            onPress={async () => {
              setIsLoading(true);
              try {
                const response = await api.post<Article[]>("/rss/items", { url });
                setItems(response.data);
                const types = await checkAllContent(url);
                setCheckedTypes(types);
              } catch (error) {
                console.error("Erro ao buscar feed:", error);
              } finally {
                setIsLoading(false);
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-2xl h-14 px-8 justify-center items-center flex-row border border-indigo-400/30 backdrop-blur-xl shadow-[0_10px_25px_rgba(79,70,229,0.35)] transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonSpinner size="small" color="#ffffff" />
            ) : (
              <ButtonText className="text-white font-semibold text-base tracking-wide">
                Buscar feed
              </ButtonText>
            )}
          </Button>
        </Box>

        {/* Results Stream */}
        <Result data={items} checkedTypes={checkedTypes} />
      </Box>
    </>
  );
};

export default MyInput;