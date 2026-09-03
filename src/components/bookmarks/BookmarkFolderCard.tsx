import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@/gluestack/card";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Trash2 } from "lucide-react-native";
import { BookmarkFolder } from "./BookmarkDrawer";

interface BookmarkFolderCardProps {
  folder: BookmarkFolder;
  onPress: () => void;
  onDelete: () => void;
}

export default function BookmarkFolderCard({
  folder,
  onPress,
  onDelete,
}: BookmarkFolderCardProps) {
  const itemsCount = folder.items?.length || 0;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card className="p-5 rounded-3xl bg-card border border-border flex-row justify-between items-center mb-3 shadow-sm">
        <Box className="flex-1 mr-4">
          <Heading size="md" className="text-foreground font-bold">
            {folder.title}
          </Heading>
          <Text size="xs" className="text-muted-foreground mt-1 font-medium">
            {itemsCount} {itemsCount === 1 ? "item salvo" : "itens salvos"}
          </Text>
        </Box>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 border border-destructive/40 rounded-lg bg-destructive/10"
        >
          <Trash2 size={16} className="text-destructive" />
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
}