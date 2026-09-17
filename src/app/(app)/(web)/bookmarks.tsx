import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
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
import { useRouter } from "expo-router";
import Header from "@/components/web/header/HeaderWeb";
import NavigateButton from "@/components/core/buttons/NavigateButton";
import useTheme from "@/hooks/useTheme";

export default function BookmarksPage() {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isDark } = useTheme();

  const router = useRouter();

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
    <Box
      className={`relative flex-1 min-h-screen transition-colors duration-500 overflow-hidden ${
        isDark ? "bg-[#0d0f17]" : "bg-slate-100"
      }`}
    >
      <Box
        className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-500 ${
          isDark ? "bg-indigo-600/20" : "bg-indigo-300/40"
        }`}
      />
      <Box
        className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isDark ? "bg-sky-500/15" : "bg-sky-300/30"
        }`}
      />

      <Box className="relative z-10 flex-1 flex flex-col min-h-screen">
        <Header />

        <Box className="max-w-[850px] w-full mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <Box
            className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 ${
              isDark
                ? "bg-white/[0.03] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                : "bg-white/70 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Navigation Pills Bar */}
            <Box className="flex-row justify-center items-center mb-8">
              <Box
                className={`p-2 rounded-2xl border backdrop-blur-xl shadow-inner transition-all duration-300 ${
                  isDark ? "bg-white/[0.05] border-white/10" : "bg-black/[0.04] border-black/10"
                }`}
              >
                <HStack space="sm" className="items-center justify-center">
                  <NavigateButton route="/" title="Início" />
                  <NavigateButton route="bookmarks" title="Bookmarks" />
                  <NavigateButton route="lists" title="Listas" />
                  <NavigateButton route="about" title="Sobre" />
                </HStack>
              </Box>
            </Box>

            {/* Page Header */}
            <HStack className="justify-between items-center mb-6">
              <Heading
                size="xl"
                className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Bookmarks
              </Heading>

              <Button
                onPress={() => setIsCreateOpen(true)}
                className="rounded-2xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 flex-row items-center gap-2 border border-indigo-400/30 shadow-[0_4px_15px_rgba(79,70,229,0.3)] transition-all duration-200"
              >
                <Plus size={18} className="text-white" />
                <ButtonText className="font-semibold text-white text-sm">Nova Pasta</ButtonText>
              </Button>
            </HStack>

            {isLoading ? (
              <Center className="py-12">
                <Spinner size="large" color="#6366f1" />
              </Center>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <VStack space="md" className="pb-4 w-full">
                  {folders.length === 0 ? (
                    <Card
                      className={`p-8 rounded-3xl border justify-center items-center py-12 backdrop-blur-md ${
                        isDark
                          ? "bg-white/[0.02] border-white/10"
                          : "bg-black/[0.02] border-black/10"
                      }`}
                    >
                      <Bookmark
                        size={48}
                        className={`mb-3 opacity-40 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      />
                      <Text
                        className={`text-center font-medium ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
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
                            router.navigate({
                              pathname: "/folder",
                              params: {
                                folderId,
                                title: folder.title,
                                items: JSON.stringify(folder.items || []),
                              },
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
          </Box>
        </Box>
      </Box>

      <CreateBookmarkFolderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchFolders}
      />
    </Box>
  );
}