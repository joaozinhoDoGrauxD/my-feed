import { Text } from "@/gluestack/text";
import Constants from "expo-constants";
import { Center } from "@/gluestack/center";
import React from "react";

export default function Copyright() {
  const appConfig = {
    version: Constants?.expoConfig?.version,
    name: Constants?.expoConfig?.name
  };

  return (
    <Center>
      <Text size="xs" className="text-muted-foreground/50 mt-8 z-10 font-semibold uppercase tracking-wider">
        {appConfig.name} • v{appConfig.version}
      </Text>
    </Center>
  );
}
