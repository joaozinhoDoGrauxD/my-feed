import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import { VStack } from "@/gluestack/vstack";
import { Play, SkipBack, SkipForward, Music, Volume2, Heart } from "lucide-react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        {/* Header Section */}
        <HStack className="justify-between items-center mb-8">
          <Heading size="xl" className="text-foreground font-bold">
            Player
          </Heading>
        </HStack>

        {/* Player Container */}
        <VStack className="flex-1 justify-center items-center pb-10" space="lg">
          <Card size="default" className="p-6 rounded-3xl bg-card border border-border w-full max-w-[400px] shadow-sm">
            {/* Album/Podcast Art Mockup */}
            <Box className="w-full aspect-square bg-secondary rounded-2xl justify-center items-center mb-6 overflow-hidden border border-border relative">
              <Music size={64} className="text-muted-foreground opacity-60" />
              <Box className="absolute bottom-3 left-3 bg-background/80 px-2.5 py-1 rounded-full border border-border/30">
                <Text size="xs" className="text-foreground font-medium">Áudio</Text>
              </Box>
            </Box>

            {/* Title and Author */}
            <HStack className="justify-between items-center mb-4">
              <VStack className="flex-1 mr-4">
                <Heading size="md" className="text-foreground font-bold" numberOfLines={1}>
                  Episódio #42 - O Futuro do React Native
                </Heading>
                <Text size="sm" className="text-muted-foreground font-medium">
                  Meu Feed Podcast
                </Text>
              </VStack>
              <TouchableOpacity onPress={() => setIsLiked(!isLiked)} activeOpacity={0.7}>
                <Heart size={22} className={isLiked ? "text-destructive fill-destructive" : "text-muted-foreground"} />
              </TouchableOpacity>
            </HStack>

            {/* Progress Bar Mockup */}
            <VStack space="xs" className="mb-6">
              <Box className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <Box className="w-1/3 h-full bg-primary rounded-full" />
              </Box>
              <HStack className="justify-between">
                <Text size="xs" className="text-muted-foreground font-medium">12:34</Text>
                <Text size="xs" className="text-muted-foreground font-medium">45:20</Text>
              </HStack>
            </VStack>

            {/* Playback Controls */}
            <HStack className="justify-center items-center mb-4" space="2xl">
              <TouchableOpacity activeOpacity={0.7}>
                <SkipBack size={28} className="text-foreground" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.8}
                className="w-16 h-16 bg-primary rounded-full justify-center items-center shadow-md active:opacity-90"
              >
                <Play size={28} className="text-primary-foreground ml-1" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SkipForward size={28} className="text-foreground" />
              </TouchableOpacity>
            </HStack>

            {/* Volume Control Icon */}
            <HStack className="justify-center items-center mt-2" space="xs">
              <Volume2 size={16} className="text-muted-foreground" />
              <Box className="w-20 h-1 bg-secondary rounded-full">
                <Box className="w-1/2 h-full bg-muted-foreground rounded-full" />
              </Box>
            </HStack>
          </Card>
        </VStack>
      </Box>
    </SafeAreaWrapper>
  );
}
