import { Icon } from "@/gluestack/icon";
import { Input, InputField } from "@/gluestack/input";
import React from "react";
import { Box } from "@/gluestack/box";
import { Center } from "@/gluestack/center";

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
    <Box className="flex-row bg-primary rounded-2xl border border-zinc-200/40 px-3.5 mb-3.5 h-12">
      <Center>
        <Icon as={icon} size="md" className="mr-2.5" />
        <Input className="flex-1 border-0 h-full bg-transparent">
          <InputField
            placeholder={placeholder}
            placeholderTextColor="#8E8E93"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            className="text-zinc-900 text-sm font-medium h-full"
          />
        </Input>
      </Center>

    </Box>
  );
}
