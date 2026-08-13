import React from "react";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";

interface CardAuthProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function CardAuth({ title, subtitle, children }: CardAuthProps) {
  return (
    <Box
      className="w-full max-w-[390px] md:max-w-[420px] bg-card rounded-[32px] p-6.5 border border-border/60 shadow-md z-10"
    >
      <Center>
      <Heading bold className="text-foreground mb-1 text-xl" size="xl">
        {title}
      </Heading>
      <Text size="sm" className="text-muted-foreground mb-6 font-medium">
        {subtitle}
      </Text>
      </Center>
      {children}
    </Box>
  );
}

