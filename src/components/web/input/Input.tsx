import { ReactNode, useState } from "react";
import { Box } from "@/gluestack/box";
import { Button, ButtonSpinner, ButtonText } from "@/gluestack/button";
import { Search } from "lucide-react-native";
import { Input, InputField, InputSlot, InputIcon } from "@/gluestack/input";
import Result from "../result/Result";
import { Article } from "@/types/article.types";
import { api } from "@/services/api";
import { Center } from "@/components/ui/center";
import NavigateButton from "@/components/core/buttons/NavigateButton";
import { checkAllContent } from "@/services/contentCheckService";

const MyInput = (): ReactNode => {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Article[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    <Box className="bg-transparent p-5">
      <Center>
        <Box className="bg-secondary m-auto">
          <NavigateButton route="About" title="Sobre" />
        </Box>
      </Center>
    </Box>
      <Box className="pt-6">
        <Box className="px-6 mb-2 flex-row gap-3 items-center">
          <Box className="flex-1">
            <Input className="h-12 rounded-2xl border-border bg-card">
              <InputField
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                onChangeText={setUrl}
                defaultValue={url}
                placeholder="Cole a URL do Feed Rss..."
                className="text-foreground"
              />
              <InputSlot className="pr-3">
                <InputIcon as={Search} className="text-muted-foreground" />
              </InputSlot>
            </Input>
          </Box>
          <Button
            onPress={async () => {
              setIsLoading(true);
              try {
                const response = await api.post<Article[]>("/rss/items", {
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
            className="bg-primary rounded-2xl h-12 px-6 justify-center items-center flex-row shadow-sm active:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonSpinner size="small" color="#ffffff" />
            ) : (
              <ButtonText className="text-primary-foreground font-semibold">Buscar feed</ButtonText>
            )}
          </Button>
        </Box>
        <Result data={items} checkedTypes={checkedTypes} />
      </Box>
    </>
  );
};

export default MyInput;
