import { Card } from "@/gluestack/card";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";

export default function AboutPage() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 p-6">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home")}
          className="mb-8 py-2 self-start"
        >
          <Text className="text-foreground font-medium text-base">← Voltar</Text>
        </TouchableOpacity>

        <Heading className="text-foreground mb-6 font-bold" size="2xl">
          Sobre o App
        </Heading>

        <Card size="default" className="p-5 rounded-3xl bg-card border border-border">
          <Text className="text-foreground text-sm leading-relaxed font-medium">
            Este aplicativo foi totalmente remodelado para uma experiência minimalista e fluida, utilizando o conceito Liquid Glass e paleta de cores Off-White.
          </Text>
        </Card>
      </Box>
    </SafeAreaWrapper>
  );
}

