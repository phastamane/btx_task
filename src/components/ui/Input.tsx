import { Input as HeroUIInput } from "@heroui/react";
import { useState } from "react";
import { SearchIcon } from "../icons/SideBarIcons";
import type {Selection, SortDescriptor} from "@heroui/react";

import React from 'react'

export default function Input({setPage}: InputProps) {

     const [filterValue, setFilterValue] = React.useState("");
      const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
      const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
      );
      const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
      });
      const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);



    const onSearchChange = React.useCallback((value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []); //обработчик запроса


  return (
        <HeroUIInput
          isClearable
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              
              
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            inputWrapper:[
              "bg-white",
              'w-2/5'
            ]
          }}
          placeholder="Поиск по публикациям"
          radius="lg"
          onValueChange={onSearchChange}
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
          }
        />
  )
}
