import React, { useState } from "react";
import { TouchableOpacity, Linking, Image } from "react-native";
import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { ExternalLink } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

const SOURCE_ICONS: Record<string, any> = {
  soundcloud: require("@/assets/images/icons/soundcloud.svg"),
  youtube: require("@/assets/images/icons/youtube.svg"),
  github: require("@/assets/images/icons/github.svg"),
  "github-dark": require("@/assets/images/icons/github-dark.svg"),
  codeberg: require("@/assets/images/icons/codeberg.svg"),
};

interface ExternalLinkButtonProps {
  url: string;
  source?: string;
}

export default function ExternalLinkButton({ url, source }: ExternalLinkButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();

  const handleOpenLink = () => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Erro ao abrir link externo:", err)
      );
    }
  };

  const normalizedSource = source?.toLowerCase() || "";
  const darkKey = `${normalizedSource}-dark`;
  const iconSource = isDark && SOURCE_ICONS[darkKey]
    ? SOURCE_ICONS[darkKey]
    : SOURCE_ICONS[normalizedSource];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOpenLink}
      //@ts-ignore
      onMouseEnter={() => setIsHovered(true)}
      //@ts-ignore
      onMouseLeave={() => setIsHovered(false)}
      className={`border py-1.5 px-2.5 rounded-xl flex-row items-center overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-md ${
        isDark ? "bg-white/[0.05] border-white/10" : "bg-black/[0.04] border-black/10"
      }`}
    >
      <HStack className="items-center">
        {iconSource ? (
          <Image source={iconSource} style={{ width: 16, height: 16 }} resizeMode="contain" />
        ) : (
          <ExternalLink size={15} className={isDark ? "text-slate-300" : "text-slate-700"} />
        )}

        <HStack
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered ? "max-w-[100px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"
          }`}
        >
          <Text size="xs" className={`font-semibold whitespace-nowrap ${isDark ? "text-white" : "text-slate-900"}`}>
            Abrir Link
          </Text>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}