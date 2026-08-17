import React, { useState } from "react";
import { TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { HStack } from "@/gluestack/hstack";
import { VStack } from "@/gluestack/vstack";
import { Rss, Plus, Trash2, Globe } from "lucide-react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";

export default function RssPage() {
  const [feedUrl, setFeedUrl] = useState("");
  const [feeds, setFeeds] = useState([
    { id: "1", title: "G1 - Tecnologia e Games", url: "g1.globo.com/rss/tecnologia", count: 12 },
    { id: "2", title: "TechCrunch - Startups", url: "techcrunch.com/feed", count: 8 },
    { id: "3", title: "Dev.to - Feed Principal", url: "dev.to/feed", count: 15 },
  ]);

  const handleAddFeed = () => {
    if (feedUrl.trim()) {
      const newFeed = {
        id: String(Date.now()),
        title: feedUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0] || "Novo Feed RSS",
        url: feedUrl,
        count: 0
      };
      setFeeds([...feeds, newFeed]);
      setFeedUrl("");
    }
  };

  const handleDeleteFeed = (id: string) => {
    setFeeds(feeds.filter(feed => feed.id !== id));
  };

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        {/* Header Section */}
        <HStack className="justify-between items-center mb-6">
          <Heading size="xl" className="text-foreground font-bold">
            Feeds RSS
          </Heading>
        </HStack>

        {/* Add Feed Input Area */}
        <HStack className="mb-6 items-center" space="sm">
          <Box className="flex-1 bg-card border border-border h-12 rounded-2xl px-4 justify-center">
            <TextInput
              value={feedUrl}
              onChangeText={setFeedUrl}
              placeholder="Inserir URL do Feed RSS..."
              placeholderTextColor="#888"
              className="text-foreground text-sm flex-1"
              autoCapitalize="none"
              keyboardType="url"
            />
          </Box>
          <TouchableOpacity
            onPress={handleAddFeed}
            activeOpacity={0.8}
            className="w-12 h-12 bg-primary rounded-2xl justify-center items-center shadow-sm"
          >
            <Plus size={22} className="text-primary-foreground" />
          </TouchableOpacity>
        </HStack>

        {/* List of feeds */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <VStack space="md" className="pb-8">
            <Text className="text-muted-foreground font-semibold text-xs uppercase tracking-wider mb-1">
              Meus Feeds ({feeds.length})
            </Text>

            {feeds.length === 0 ? (
              <Card size="default" className="p-6 rounded-3xl bg-card border border-border justify-center items-center py-10">
                <Rss size={48} className="text-muted-foreground opacity-40 mb-3" />
                <Text className="text-muted-foreground text-center font-medium">
                  Nenhum feed cadastrado ainda. Adicione uma URL acima!
                </Text>
              </Card>
            ) : (
              feeds.map((feed) => (
                <Card
                  key={feed.id}
                  size="default"
                  className="p-4 rounded-3xl bg-card border border-border shadow-sm flex-row items-center justify-between"
                >
                  <HStack space="md" className="flex-1 items-center">
                    <Box className="w-10 h-10 bg-secondary rounded-2xl justify-center items-center border border-border">
                      <Rss size={18} className="text-primary" />
                    </Box>
                    <VStack className="flex-1">
                      <Heading size="sm" className="text-foreground font-bold" numberOfLines={1}>
                        {feed.title}
                      </Heading>
                      <HStack space="xs" className="items-center">
                        <Globe size={11} className="text-muted-foreground" />
                        <Text size="xs" className="text-muted-foreground" numberOfLines={1}>
                          {feed.url}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center ml-2">
                    <Box className="bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <Text size="xs" className="text-primary font-bold">
                        {feed.count} arts
                      </Text>
                    </Box>
                    <TouchableOpacity
                      onPress={() => handleDeleteFeed(feed.id)}
                      activeOpacity={0.7}
                      className="p-1"
                    >
                      <Trash2 size={18} className="text-destructive/80 active:text-destructive" />
                    </TouchableOpacity>
                  </HStack>
                </Card>
              ))
            )}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  );
}
