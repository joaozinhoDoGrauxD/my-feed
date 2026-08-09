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
        <Center className="w-16 h-16 rounded-2xl bg-primary mb-4 shadow-sm">
          <Icon as={RssIcon} size="xl" className="text-primary-foreground" />
        </Center>

        <Heading bold className="text-foreground tracking-tight text-3xl mb-1">
          My-Feed
        </Heading>
        <Box className="bg-muted rounded-2xl mt-3 p-4">
          <Center>
            <Text size="sm" className="text-muted-foreground text-center max-w-[280px] leading-relaxed font-medium">
              {subtitle}
            </Text>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
