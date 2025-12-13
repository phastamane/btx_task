"use client";

import { useMemo, useState } from "react";
import type { SortDescriptor } from "@heroui/react";
import type { UserInterface } from "@/types/users";
import type { Post } from "@/types/posts";
import type { CommentItem } from "@/types/comments";
import type { SortableColumnUsers } from "@/types/sortableColumn";

export function useUsersTable(
  users: UserInterface[],
  admins: UserInterface[],
  usersPosts: Map<number, { post: Post[]; likes: number }>,
  userComments: Map<number, { comments: CommentItem[] }>
) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [filterValue, setFilterValue] = useState("");

  // -----------------------------
  // ОБЪЕДИНЕНИЕ USERS + ADMINS
  // -----------------------------
  const usersArr = useMemo(() => {
    const merged = [...admins, ...users];

    return merged.filter(
      (user, index, arr) =>
        index === arr.findIndex((u) => u.id === user.id)
    );
  }, [admins, users]);

  // -----------------------------
  // ФИЛЬТРАЦИЯ
  // -----------------------------
  const filteredUsers = useMemo(() => {
    if (!filterValue.trim()) return usersArr;

    return usersArr.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  }, [usersArr, filterValue]);

  // -----------------------------
  // СОРТИРОВКА
  // -----------------------------
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumnUsers;

      let x = 0;
      let y = 0;

      switch (col) {
        case "likes":
          x = usersPosts.get(a.id)?.likes ?? 0;
          y = usersPosts.get(b.id)?.likes ?? 0;
          break;

        case "posts":
          x = usersPosts.get(a.id)?.post.length ?? 0;
          y = usersPosts.get(b.id)?.post.length ?? 0;
          break;

        case "comments":
          x = userComments.get(a.id)?.comments.length ?? 0;
          y = userComments.get(b.id)?.comments.length ?? 0;
          break;

        default: {
          const aVal = a[col as keyof UserInterface];
          const bVal = b[col as keyof UserInterface];

          if (typeof aVal === "string" && typeof bVal === "string") {
            return aVal.localeCompare(bVal);
          }

          return (aVal as any) - (bVal as any);
        }
      }

      return x - y;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();

    return sorted;
  }, [filteredUsers, sortDescriptor, usersPosts, userComments]);

  // -----------------------------
  // ПАГИНАЦИЯ
  // -----------------------------
  const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedUsers.slice(start, start + rowsPerPage);
  }, [sortedUsers, page, rowsPerPage]);

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
