import { Select, SelectItem } from "@heroui/react";
import { SelectProps } from "@/types/select";
import { useMemo, useState } from "react";

export default function SelectPage({
  rowsPerPage,
  setRowsPerPage,
  setPage,
  options,
}: SelectProps) {
  const perPageOptions = useMemo(
    () => options ?? Array.from({ length: 20 }, (_, i) => i + 1),
    [options]
  );

  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set([String(rowsPerPage)])
  );

  return (
    <Select
      className="max-w-xs"
      classNames={{
        mainWrapper: "text-blue-500 max-w-17 ",
        trigger: "text-blue-600 bg-transparent shadow-none cursor-pointer",
        selectorIcon: "text-blue-600",
        value: "text-blue-600!",
        popoverContent: "text-blue-500",
      }}
      items={perPageOptions.map((n) => ({
        key: String(n),
        label: String(n),
      }))}
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        const value = Number(Array.from(keys)[0]);
        setSelectedKeys(new Set([String(value)]));
        setRowsPerPage(value);
        setPage(1);
      }}
      label="Строк на странице"
      labelPlacement="outside-left"
    >
      {(el) => <SelectItem key={el.key}>{el.label}</SelectItem>}
    </Select>
  );
}
