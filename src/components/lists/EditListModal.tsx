import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@/components/ui/modal";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { VStack } from "@/gluestack/vstack";
import { HStack } from "@/gluestack/hstack";
import { Button, ButtonText } from "@/gluestack/button";
import { Input, InputField } from "@/components/ui/input";
import { X, Trash2 } from "lucide-react-native";
import { api } from "@/services/api";

export interface ListData {
  _id?: string;
  id?: string;
  title: string;
  urls: string[];
}

interface EditListModalProps {
  isOpen: boolean;
  list: ListData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditListModal({ isOpen, list, onClose, onSuccess }: EditListModalProps) {
  const [title, setTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [isUpdatingTitle, setIsUpdatingTitle] = useState(false);
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const listId = list?._id || list?.id || "";

  useEffect(() => {
    if (list) {
      setTitle(list.title || "");
      setUrls(list.urls || []);
      setNewUrl("");
    }
  }, [list]);

  // Adicionar URL à lista
  const handleAddUrl = async () => {
    if (!newUrl.trim() || !listId) return;
    try {
      setIsAddingUrl(true);
      await api.patch(`/lists/${listId}/urls`, { url: newUrl.trim() });
      setUrls((prev) => [...prev, newUrl.trim()]);
      setNewUrl("");
      onSuccess();
    } catch (err) {
      console.error("Erro ao adicionar URL:", err);
    } finally {
      setIsAddingUrl(false);
    }
  };

  // Remover URL individual da lista
  const handleRemoveUrl = async (urlToRemove: string) => {
    if (!listId) return;
    try {
      await api.delete(`/lists/${listId}/urls`, { data: { url: urlToRemove } });
      setUrls((prev) => prev.filter((u) => u !== urlToRemove));
      onSuccess();
    } catch (err) {
      console.error("Erro ao remover URL:", err);
    }
  };

  // Deletar a lista inteira
  const handleDeleteList = async () => {
    if (!listId) return;
    try {
      await api.delete(`/lists/${listId}`);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Erro ao deletar lista:", err);
    }
  };

  if (!list) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="p-6 rounded-3xl bg-card border border-border max-w-[500px] w-full">
        <ModalHeader className="flex-row justify-between items-center border-b-0 pb-2">
          <Heading size="lg" className="text-foreground font-bold">
            Editar Lista
          </Heading>
          <ModalCloseButton onPress={onClose}>
            <X size={20} className="text-foreground" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="mt-2">
          <ScrollView showsVerticalScrollIndicator={false} className="max-h-[80vh]">
            <VStack space="lg">
              <Box className="gap-2">
                <Input className="border border-border rounded-xl p-2 bg-secondary">
                  <InputField
                    placeholder="Nome da lista"
                    value={title}
                    onChangeText={setTitle}
                  />
                </Input>
              </Box>

              <Box className="gap-2">
                <Input className="border border-border rounded-xl p-2 bg-secondary">
                  <InputField
                    placeholder="https://example.com"
                    value={newUrl}
                    onChangeText={setNewUrl}
                  />
                </Input>
                <Button
                  onPress={handleAddUrl}
                  isDisabled={isAddingUrl || !newUrl.trim()}
                  className="rounded-xl bg-foreground"
                >
                  <ButtonText className="text-background font-semibold">
                    {isAddingUrl ? "Adicionando..." : "Adicionar URL"}
                  </ButtonText>
                </Button>
              </Box>

              <VStack space="xs" className="mt-2">
                <Text size="xs" className="text-muted-foreground font-bold uppercase tracking-wider mb-1">
                  URLs
                </Text>

                {urls.length === 0 ? (
                  <Text size="sm" className="text-muted-foreground italic">
                    Nenhuma URL cadastrada nesta lista.
                  </Text>
                ) : (
                  urls.map((urlItem, index) => (
                    <HStack
                      key={index}
                      className="justify-between items-center bg-secondary p-3 rounded-xl border border-border"
                    >
                      <Text size="sm" className="text-foreground flex-1 mr-2" numberOfLines={1}>
                        {urlItem}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleRemoveUrl(urlItem)}
                        className="p-1 border border-destructive/40 rounded-lg bg-destructive/10"
                      >
                        <X size={16} className="text-destructive" />
                      </TouchableOpacity>
                    </HStack>
                  ))
                )}
              </VStack>

              <Button
                onPress={handleDeleteList}
                className="rounded-xl mt-4 bg-destructive"
              >
                <ButtonText className="font-bold">Deletar Lista</ButtonText>
              </Button>
            </VStack>
          </ScrollView>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}