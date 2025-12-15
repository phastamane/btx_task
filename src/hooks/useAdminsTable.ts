"use client";

import { useMemo, useState } from "react";
import type { UserInterface } from "@/types/users";
import type { SortDescriptor } from "@heroui/react";
import type { SortableColumnAdmins } from "@/types/sortableColumn";

const GENDER_ORDER: Record<string, number> = {
  male: 0,
  female: 1,
};

export function useAdminsTable(admins: UserInterface[]) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [filterValue, setFilterValue] = useState("");

  // -----------------------------
  // ФИЛЬТРАЦИЯ
  // -----------------------------
  const filteredAdmins = useMemo(() => {
    if (!filterValue.trim()) return admins;

    return admins.filter((admin) =>
      `${admin.firstName} ${admin.lastName} ${admin.email}`
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  }, [admins, filterValue]);

  // -----------------------------
  // СОРТИРОВКА
  // -----------------------------
  const sortedAdmins = useMemo(() => {
    const sorted = [...filteredAdmins];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumnAdmins;

      let x: number | string = "";
      let y: number | string = "";

      switch (col) {
        case "birthInfo":
        case "age":
          x = a.age;
          y = b.age;
          break;

        case "gender":
          x = GENDER_ORDER[a.gender] ?? 99;
          y = GENDER_ORDER[b.gender] ?? 99;
          break;

        default:
          x = a[col];
          y = b[col];
      }

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();

    return sorted;
  }, [filteredAdmins, sortDescriptor]);

  // -----------------------------
  // ПАГИНАЦИЯ
  // -----------------------------
  const pageCount = Math.ceil(filteredAdmins.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedAdmins.slice(start, start + rowsPerPage);
  }, [sortedAdmins, page, rowsPerPage]);

  return {
    items,
    page,
    pageCount,
    rowsPerPage,
    filterValue,
    sortDescriptor,
    setPage,
    setRowsPerPage,
    setFilterValue,
    setSortDescriptor,
  };
}
