import React, { useState, useEffect } from "react";
import { TouchableOpacity, Linking, Image, Platform } from "react-native";
import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { ExternalLink } from "lucide-react-native";

// Quando um icone precisa ser especificado para 
// ser usado no tema escuro, o nome precisa ser 
// "{source}-dark.svg" e deve ser declarado no SOURCE_ICONS.


// Mapeamento de ícones.
const SOURCE_ICONS: Record<string, any> = {
  soundcloud: require("@/assets/images/icons/soundcloud.svg"),
  youtube: require("@/assets/images/icons/youtube.svg"),
  github: require("@/assets/images/icons/github.svg"),
  "github-dark": require("@/assets/images/icons/github-dark.svg"),
  codeberg: require("@/assets/images/icons/codeberg.svg"),
};

function getCookie(name: string): string | null {
  if (Platform.OS !== "web" || typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

interface ExternalLinkButtonProps {
  url: string;
  source?: string;
}

export default function ExternalLinkButton({ url, source }: ExternalLinkButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Checa o tema do usuário (LocalStorage / Cookie)
  useEffect(() => {
    let theme: string | null = null;

    if (Platform.OS === "web" && typeof window !== "undefined") {
      theme = localStorage.getItem("my-theme") || getCookie("my-theme");
    }

    setIsDark(theme === "dark");
  }, []);

  const handleOpenLink = () => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Erro ao abrir link externo:", err)
      );
    }
  };

  const normalizedSource = source?.toLowerCase() || "";

  // Determina a chave da imagem baseada no tema
  const darkKey = `${normalizedSource}-dark`;
  const iconSource = isDark && SOURCE_ICONS[darkKey]
    ? SOURCE_ICONS[darkKey]
    : SOURCE_ICONS[normalizedSource];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOpenLink}
      //@ts-ignore Handlers de hover para Web
      onMouseEnter={() => setIsHovered(true)}
      //@ts-ignore
      onMouseLeave={() => setIsHovered(false)}
      className="bg-secondary border border-border py-2 px-2.5 rounded-xl flex-row items-center overflow-hidden transition-all duration-300 ease-in-out self-end"
    >
      <HStack className="items-center">

        {iconSource ? (
          <Image source={iconSource} style={{ width: 16, height: 16 }} resizeMode="contain" />
        ) : (
          <ExternalLink size={16} className="text-foreground" />
        )}

        <HStack
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered ? "max-w-[100px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"
          }`}
        >
          <Text size="xs" className="text-foreground font-semibold whitespace-nowrap">
            Abrir Link
          </Text>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}