import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import SafeAreaWrapper from "../core/SafeAreaWrapper";

export default function MobileIndex() {
  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        {/* Header Section */}
        <HStack className="justify-between items-center mb-8">
          <Heading size="xl" className="text-foreground font-bold">
            Meu Feed
          </Heading>
          <HStack space="md" className="items-center">
            <Box>
            </Box>
          </HStack>
        </HStack>

        {/* Feed Content Area */}
        <Box className="flex-1 justify-center items-center">
          <Card size="default" className="p-6 rounded-3xl bg-card border border-border w-full max-w-[400px]">
            <Heading size="md" className="text-foreground mb-2 font-semibold text-center">
              Bem-vindo ao seu Feed!
            </Heading>
            <Text size="sm" className="text-muted-foreground text-center leading-relaxed">
              Explore novos conteúdos, mude o tema acima ou use o menu de navegação para saber mais sobre nós.
            </Text>
          </Card>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
}
