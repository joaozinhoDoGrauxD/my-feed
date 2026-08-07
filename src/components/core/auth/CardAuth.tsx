import React from "react";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Dimensions} from "react-native";

interface CardAuthProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const windowWidth = Dimensions.get("window").width;
const CARD_WIDTH = Math.min(windowWidth * 0.88, 380);

export default function CardAuth({ title, subtitle, children }: CardAuthProps) {
  return (
      <Box style={{width: CARD_WIDTH}} className="bg-primary-foreground rounded-3xl p-6 border border-white/80 shadow-lg z-10">

      <Heading bold className="bg-primary-foreground mb-0.5" size="lg">
        {title}
      </Heading>
      <Text size="md" className="text-primary-foreground mb-5">
        {subtitle}
      </Text>
      {children}
      </Box>
  );
}
