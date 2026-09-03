import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { Bookmark, BookmarkCheck } from "lucide-react-native";

interface BookmarkButtonProps {
  onPress: () => void;
  isSavedJustNow?: boolean;
}

export default function BookmarkButton({ onPress, isSavedJustNow }: BookmarkButtonProps) {
  const [showSavedText, setShowSavedText] = useState(false);

  useEffect(() => {
    if (isSavedJustNow) {
      setShowSavedText(true);
      const timer = setTimeout(() => {
        setShowSavedText(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSavedJustNow]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`border py-1.5 px-2.5 rounded-xl flex-row items-center overflow-hidden transition-all duration-300 ease-in-out self-start ${
        showSavedText
          ? "bg-emerald-500/15 border-emerald-500"
          : "bg-secondary border-border"
      }`}
    >
      <HStack className="items-center">
        {showSavedText ? (
          <BookmarkCheck size={16} className="text-emerald-500" />
        ) : (
          <Bookmark size={16} className="text-foreground" />
        )}

        <HStack
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showSavedText ? "max-w-[100px] opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0"
          }`}
        >
          <Text
            size="xs"
            className={`font-semibold whitespace-nowrap ${
              showSavedText ? "text-emerald-500" : "text-foreground"
            }`}
          >
            Salvo!
          </Text>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}