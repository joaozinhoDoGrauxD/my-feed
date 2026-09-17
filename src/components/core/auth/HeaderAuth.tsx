import React from "react";
import { Heading } from "@/gluestack/heading";
import { Icon } from "@/gluestack/icon";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { RssIcon } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

interface HeaderAuthProps {
  subtitle: string;
}

export default function HeaderAuth({ subtitle }: HeaderAuthProps) {
  const { isDark } = useTheme();

  return (
    <Box className="mb-6 z-10">
      <Center>
        <Center className="w-16 h-16 rounded-2xl bg-indigo-600 mb-4 shadow-lg border border-indigo-400/30">
          <Icon as={RssIcon} size="xl" className="text-white" />
        </Center>

        <Heading
          bold
          className={`tracking-tight text-3xl mb-1 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          My-Feed
        </Heading>
        <Box
          className={`rounded-2xl mt-3 p-4 border backdrop-blur-md ${
            isDark
              ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]"
              : "bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.06)]"
          }`}
        >
          <Center>
            <Text
              size="sm"
              className={`text-center max-w-[280px] leading-relaxed font-medium ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {subtitle}
            </Text>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}