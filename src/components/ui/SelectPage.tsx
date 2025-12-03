import { Select, SelectItem } from "@heroui/react";
import { SelectProps } from "@/types/select";
import { useState } from "react";

export default function SelectPage({

  pageCount,
  setPage,
}: SelectProps) {
  const arrayForSelect = Array.from({ length: pageCount }, (_, i) => ({
    key: String(i + 1),
    label: String(i + 1),
    value: i + 1,
  }));
  const [selectedPage, setSelectedPage] = useState<string | number>(1);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set([String(selectedPage)])
  );
  return (
    <Select
      className="max-w-xs"
      classNames={{
        mainWrapper: "text-blue-500 w-15 ",
        trigger: "text-blue-600 bg-transparent shadow-none cursor-pointer",
        selectorIcon: "text-blue-600",
        value: "text-blue-600!",
        popoverContent: "text-blue-500",
      }}
      items={arrayForSelect}
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        setSelectedKeys(new Set([value]));
        setSelectedPage(Number(value));
        setPage(Number(value)); // если table state
      }}
      label="Показывать на странице"
      labelPlacement="outside-left"
    >
      {(el) => <SelectItem key={el.key}>{el.label}</SelectItem>}
    </Select>
  );
}
