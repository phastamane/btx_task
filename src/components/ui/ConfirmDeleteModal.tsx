"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

export default function ConfirmDeleteModal({
  isOpen,
  onOpenChange,
  onConfirm,
  user
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  user: any;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
      <ModalContent>
        <ModalHeader className="text-xl font-bold">
          Удаление пользователя
        </ModalHeader>

        <ModalBody>
          <p className="text-lg">
            Вы уверены, что хотите удалить пользователя{" "}
            <span className="font-semibold">{user?.firstName} {user?.lastName}</span>?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button color="danger" onPress={onConfirm}>
            Удалить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
