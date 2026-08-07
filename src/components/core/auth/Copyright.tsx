import { Text } from "@/gluestack/text";
import Constants from "expo-constants";
import { Center } from "@/gluestack/center";
import React from "react";

export default function Copyright() {
  const appConfig = {
    version:  Constants?.expoConfig?.version,
    name: Constants?.expoConfig?.name
  }
  return (
    <Center>
    <Text size="sm" bold className="text-primary-foreground mt-7 z-10"> {appConfig.name} • v{appConfig.version} </Text>
    </Center>
  );
}
