import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { Button, ButtonText } from "@/gluestack/button";
import { VStack } from "@/gluestack/vstack";
import { HStack } from "@/gluestack/hstack";
import { Spinner } from "@/gluestack/spinner";
import { Center } from "@/components/ui/center";
import { Plus, Bookmark } from "lucide-react-native";
import { api } from "@/services/api";
import BookmarkFolderCard from "@/components/bookmarks/BookmarkFolderCard";
import CreateBookmarkFolderModal from "@/components/bookmarks/CreateBookmarkFolderModal";
import { BookmarkFolder } from "@/components/bookmarks/BookmarkDrawer";

export default function BookmarksPage() {
  const navigation = useNavigation<any>();
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/bookmarks");
      setFolders(res.data);
    } catch (err) {
      console.error("Erro ao buscar pastas de bookmarks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await api.delete(`/bookmarks/${folderId}`);
      fetchFolders();
    } catch (err) {
      console.error("Erro ao deletar pasta:", err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home"))}
          className="mb-4 py-2 self-start"
        >
          <Text className="text-foreground font-medium text-base">← Voltar</Text>
        </TouchableOpacity>

        <HStack className="justify-between items-center mb-6">
          <Heading size="xl" className="text-foreground font-bold">
            Bookmarks
          </Heading>

          <Button
            onPress={() => setIsCreateOpen(true)}
            className="rounded-2xl px-4 flex-row items-center gap-2 bg-primary"
          >
            <Plus size={18} className="text-background" />
            <ButtonText className="font-bold text-background">Nova Pasta</ButtonText>
          </Button>
        </HStack>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" />
          </Center>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <VStack space="md" className="pb-8 max-w-[650px] mx-auto w-full">
              {folders.length === 0 ? (
                <Card className="p-8 rounded-3xl bg-card border border-border justify-center items-center py-12">
                  <Bookmark size={48} className="text-muted-foreground opacity-40 mb-3" />
                  <Text className="text-muted-foreground text-center font-medium">
                    Nenhuma pasta de bookmark criada.
                  </Text>
                </Card>
              ) : (
                folders.map((folder) => {
                  const folderId = folder._id || folder.id || "";
                  return (
                    <BookmarkFolderCard
                      key={folderId}
                      folder={folder}
                      onPress={() =>
                        navigation.navigate("BookmarkFolderContent", {
                          folderId,
                          title: folder.title,
                          items: folder.items || [],
                        })
                      }
                      onDelete={() => handleDeleteFolder(folderId)}
                    />
                  );
                })
              )}
            </VStack>
          </ScrollView>
        )}

        <CreateBookmarkFolderModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={fetchFolders}
        />
      </Box>
    </SafeAreaWrapper>
  );
}