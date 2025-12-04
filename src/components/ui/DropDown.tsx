import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@heroui/react";
import { DeleteIcon, EditIcon } from "../icons/Icons";
export default function DropDown() {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <Dropdown
  classNames={{
    trigger: "border-0 px-0 "
  }}
  size="md"
>
  <DropdownTrigger>
    <Button variant="ghost" className="min-w-6 px-4 py-1">...</Button>
  </DropdownTrigger>

  <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
    <DropdownItem
      key="edit"
      startContent={<EditIcon className={iconClasses} />}
    >
      Редактировать
    </DropdownItem>

    <DropdownItem
      key="delete"
      className="text-danger"
      color="danger"
      startContent={
        <DeleteIcon className={cn(iconClasses, "text-danger")} />
      }
    >
      Удалить
    </DropdownItem>
  </DropdownMenu>
</Dropdown>

  );
}
