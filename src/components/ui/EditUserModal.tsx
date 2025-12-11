"use client";

import {
  Modal as HeroUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { updateUser } from "@/services/users.servise";
import { useLocalUsersStore } from "@/store/localUsers.store";
import EditUserForm from "./EditUserForm";
export default function EditUserModal({
  user,
  isOpen,
  onOpenChange,
}: {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
   const updateLocal = useLocalUsersStore((s) => s.updateLocalUser);

  const handleSubmit = async (formData: any) => {
    const updated = await updateUser(user.id, formData);

    updateLocal(updated);
    onOpenChange(false);
  };

  return (
    <HeroUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 items-center text-center font-bold">
              <p className="text-3xl">Редактирование пользователя</p>

              <img
                src={user.image || "/no-avatar-user.svg"}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            </ModalHeader>

            <ModalBody className="items-center">
              <EditUserForm
                onSubmit={handleSubmit}
                initialUser={user}
              />
            </ModalBody>

            <ModalFooter />
          </>
        )}
      </ModalContent>
    </HeroUIModal>
  );
}