import React, { useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Spinner } from "@/gluestack/spinner";
import { Plus } from "lucide-react-native";
import { api } from "@/services/api";
import CreateBookmarkFolderModal from "./CreateBookmarkFolderModal";

export interface BookmarkFolder {
  _id?: string;
  id?: string;
  title: string;
  items?: any[];
}

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFolder: (folderId: string) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function BookmarkDrawer({
  isOpen,
  onClose,
  onSelectFolder,
}: BookmarkDrawerProps) {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/bookmarks");
      setFolders(res.data);
    } catch (err) {
      console.error("Erro ao carregar pastas de bookmark:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFolders();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 150,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleOpenAddFolderModal = () => {
    onClose();
    setIsCreateModalOpen(true); 
  };

  const handleFolderCreated = async (newFolder: BookmarkFolder) => {
    const folderId = newFolder._id || newFolder.id;
    if (folderId) {
      onSelectFolder(folderId);
    }
  };

  return (
    <>
      <Modal
        transparent
        visible={isOpen}
        onRequestClose={onClose}
        animationType="none"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        />

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          className="bg-card border-t border-border rounded-t-3xl max-h-[80vh] flex-col overflow-hidden shadow-2xl"
        >
          <Box className="items-center py-3">
            <Box className="w-12 h-1.5 bg-border rounded-full" />
          </Box>

          <ScrollView className="flex-1 max-h-[50vh]">
            {isLoading ? (
              <Box className="py-8 items-center">
                <Spinner size="small" />
              </Box>
            ) : folders.length === 0 ? (
              <Box className="py-6 items-center">
                <Text className="text-muted-foreground text-sm">
                  Nenhuma pasta encontrada.
                </Text>
              </Box>
            ) : (
              folders.map((folder) => {
                const folderId = folder._id || folder.id || "";
                return (
                  <TouchableOpacity
                    key={folderId}
                    activeOpacity={0.7}
                    onPress={() => onSelectFolder(folderId)}
                    className="py-4 px-6 border-b border-border items-center justify-center bg-card active:bg-secondary/50"
                  >
                    <Text className="text-foreground font-semibold text-center text-base">
                      {folder.title}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleOpenAddFolderModal}
            className="py-4 px-6 border-t border-border items-center justify-center flex-row gap-2 bg-card active:bg-secondary/50"
          >
            <Text className="text-foreground font-bold text-base">
              Adicionar Pasta
            </Text>
            <Plus size={18} className="text-foreground" />
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      <CreateBookmarkFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleFolderCreated}
      />
    </>
  );
}