import { Icon } from "@/gluestack/icon";
import { Input, InputField } from "@/gluestack/input";
import { Center } from "@/components/ui/center";
import React from "react";
import { Box } from "@/gluestack/box";

interface InputWrapperAuthProps {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function InputWrapperAuth({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none"
}: InputWrapperAuthProps) {
  return (
    <Box className="flex-row bg-secondary rounded-2xl border border-border/80 px-3.5 mb-3.5 h-12 items-center">
      <Center>
        <Icon as={icon} size="md" className="text-secondary-foreground/60" />
      </Center>
      <Box className="flex-1 ml-2">
        <Input className="border-0 h-full bg-transparent w-full">
          <InputField
            placeholder={placeholder}
            placeholderTextColor="#8E8E93"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            className="text-secondary-foreground text-sm font-medium h-full w-full"
          />
        </Input>
      </Box>
    </Box>
  );
}
