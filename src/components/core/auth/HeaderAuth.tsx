import { Heading } from "@/gluestack/heading";
import { Icon } from "@/gluestack/icon";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { RssIcon } from "lucide-react-native";
import React from "react";

interface HeaderAuthProps {
  subtitle: string;
}

export default function HeaderAuth({ subtitle }: HeaderAuthProps) {
  return (
    <Box className="mb-6 z-10">
      <Center>
        <Box className="w-16 h-16 rounded-full">
          <Icon as={RssIcon} size="xl" />
        </Box>
        <Heading bold className="text-primary-foreground tracking-tight" size="2xl">
          My-Feed
        </Heading>
        <Center>
        <Text size="sm" className="text-primary-foreground r mt-1 max-w-[280px] leading-relaxed">
          {subtitle}
        </Text>
        </Center>
        );
      </Center>
    </Box>
  )
}
