import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@/gluestack/card";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Button, ButtonText } from "@/gluestack/button";
import { Edit2 } from "lucide-react-native";
import { ListData } from "./EditListModal";

interface ListCardProps {
  list: ListData;
  onPress: () => void;
  onEdit: () => void;
}

export default function ListCard({ list, onPress, onEdit }: ListCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card className="p-5 rounded-3xl bg-card border border-border flex-row justify-between items-center mb-3 shadow-sm">
        <Box className="flex-1 mr-4">
          <Heading size="md" className="text-foreground font-bold">
            {list.title}
          </Heading>
          <Text size="xs" className="text-muted-foreground mt-1 font-medium">
            {list.urls?.length || 0} feed(s) cadastrado(s)
          </Text>
        </Box>

        <Button
          variant="outline"
          size="sm"
          onPress={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded-xl border-border bg-secondary flex-row items-center gap-1.5"
        >
          <Edit2 size={14} className="text-foreground" />
        </Button>
      </Card>
    </TouchableOpacity>
  );
}