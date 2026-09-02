import React, { useState } from "react";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@/components/ui/modal";
import { Heading } from "@/gluestack/heading";
import { Button, ButtonText } from "@/gluestack/button";
import { Input, InputField } from "@/components/ui/input";
import { X } from "lucide-react-native";
import { api } from "@/services/api";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateListModal({ isOpen, onClose, onSuccess }: CreateListModalProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      setIsSubmitting(true);
      await api.post("/lists", { title: title.trim(), urls: [] });
      setTitle("");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Erro ao criar lista:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="p-6 rounded-3xl bg-card border border-border max-w-[500px] w-full">
        <ModalHeader className="flex-row justify-between items-center border-b-0 pb-0">
          <Heading size="lg" className="text-foreground font-bold">
            Nova Lista
          </Heading>
          <ModalCloseButton onPress={onClose}>
            <X size={20} className="text-foreground" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="mt-4 gap-4">
          <Input className="border border-border rounded-xl p-2 bg-secondary">
            <InputField
              placeholder="Nome da lista"
              value={title}
              onChangeText={setTitle}
            />
          </Input>

          <Button
            onPress={handleCreate}
            isDisabled={isSubmitting || !title.trim()}
            className="rounded-xl mt-2"
          >
            <ButtonText>{isSubmitting ? "Criando..." : "Criar Lista"}</ButtonText>
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}