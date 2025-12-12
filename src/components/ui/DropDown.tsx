"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure
} from "@heroui/react";

import { DeleteIcon, DotsIcon, EditIcon } from "../icons/Icons";
import { useLocalUsersStore } from "@/store/localUsers.store";

import EditUserModal from "./EditUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { UserInterface } from "@/types/users";

export default function DropDown({ user }: { user: UserInterface }) {
  // Управление модалками
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const deleteLocalUser = useLocalUsersStore((s) => s.deleteLocalUser);

  const handleDelete = () => {
    deleteLocalUser(user.id);
    deleteModal.onClose();
  };

  return (
    <>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="ghost" className="min-w-6 px-4 py-1 border-none text-xl">
            <DotsIcon/>
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="User menu" variant="faded">
          <DropdownItem
            key="edit"
            startContent={<EditIcon className="text-xl" />}
            onPress={editModal.onOpen}
          >
            Редактировать
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<DeleteIcon className="text-xl text-danger" />}
            onPress={deleteModal.onOpen}
          >
            Удалить
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <EditUserModal
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        user={user}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        user={user}
        onConfirm={handleDelete}
      />
    </>
  );
}
