import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { Link, LinkText } from "@/gluestack/link";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface FooterLinkAuthProps {
  promptText: string;
  linkText: string;
  href: any;
}

export default function FooterLinkAuth({ promptText, linkText, href }: FooterLinkAuthProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(href);
    }
  };

  return (
    <Box className="flex-row justify-center mt-6">
      <Center className="flex-row">
        <Text size="sm" className="text-muted-foreground font-medium">
          {promptText}
        </Text>
        <Link onPress={handlePress} className="ml-1 active:opacity-80">
          <LinkText  bold size="sm" className="text-primary no-underline hover:underline">
            {linkText}
          </LinkText>
        </Link>
      </Center>
    </Box>
  );
}
