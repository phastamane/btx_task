import {
  Modal as HeroUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import FormAddPerson from "./FormAddPerson";
import { ADMINS_CONST } from "@/shared/constants/admins.constants";
import { Plus } from "../icons/Icons";
import { USERS_CONST } from "@/shared/constants/users.constants";

export default function Modal({page}:{page:string}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} startContent={<Plus/>} color="primary">{page === 'admins' ? ADMINS_CONST.button : USERS_CONST.button}</Button>
      <HeroUIModal isOpen={isOpen} onOpenChange={onOpenChange} className="py-4 px-2 rounded-3xl" classNames={{
        closeButton: "top-3 end-5 text-2xl"
      }} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-5 items-center text-center font-bold">
                <p className="text-4xl">{page === 'admins' ? ADMINS_CONST.modalTitle : USERS_CONST.modalTitle}</p>
                <img src='/no-avatar-user.svg' alt="" />
              </ModalHeader>
              <ModalBody className="items-center">
                <FormAddPerson onPress={onClose} context={page === 'admins' ? 'admin' : 'user'}/>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroUIModal>
    </>
  );
}
