import { Input as HeroUIInput } from "@heroui/react";
import { SearchIcon } from "../icons/Icons";

export default function InputSearch({
  filterValue,
  setFilterValue,
  setPage,
}: {
  filterValue: string;
  setFilterValue: (v: string) => void;
  setPage: (n: number) => void;
}) {
  const onSearchChange = (value?: string) => {
    setFilterValue(value ?? "");
    setPage(1);
  };

  return (
    <HeroUIInput
      isClearable
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: "text-black/90 dark:text-white/90",
        inputWrapper: ["bg-white", "w-2/5"],
      }}
      placeholder="Поиск по публикациям"
      radius="lg"
      value={filterValue}
      onValueChange={onSearchChange}
      startContent={<SearchIcon className="text-slate-400" />}
    />
  );
}
