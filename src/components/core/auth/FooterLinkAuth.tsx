import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";
import { Link } from "@/gluestack/link";
import React from "react";

interface FooterLinkAuthProps {
  promptText: string;
  linkText: string;
  href: string;
}

export default function FooterLinkAuth({ promptText, linkText, href }: FooterLinkAuthProps) {

  return (
    <Box className="flex-row mt-5">
      <Center>
        <Text size="md" className="text-primary-foreground">
          {promptText}
        </Text>
        <Link className="text-primary-foreground underline" href={href}> {linkText}</Link>
      </Center>
    </Box>
  );
}
