"use client";

import { useMemo, useState } from "react";
import type { SortDescriptor } from "@heroui/react";
import type { DataTableType, Post } from "@/types/posts";
import type { CommentTableType } from "@/types/comments";
import type { SortableColumnPosts } from "@/types/sortableColumn";

export function usePostsTable(
  posts: DataTableType,
  comments: CommentTableType
) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [filterValue, setFilterValue] = useState("");

  // -----------------------------
  // ФИЛЬТРАЦИЯ
  // -----------------------------
  const filteredPosts = useMemo(() => {
    if (!filterValue.trim()) return posts;

    return posts.filter((p) =>
      p.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [posts, filterValue]);

  // -----------------------------
  // СОРТИРОВКА
  // -----------------------------
  const sortedPosts = useMemo(() => {
    const sorted = [...filteredPosts];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumnPosts;

      let x: number | string = 0;
      let y: number | string = 0;

      switch (col) {
        case "likes":
          x = a.reactions.likes;
          y = b.reactions.likes;
          break;

        case "comments":
          x = comments.get(a.id)?.comments.length ?? 0;
          y = comments.get(b.id)?.comments.length ?? 0;
          break;

        default:
          x = a[col as keyof Post] as any;
          y = b[col as keyof Post] as any;
      }

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();

    return sorted;
  }, [filteredPosts, sortDescriptor, comments]);

  // -----------------------------
  // ПАГИНАЦИЯ
  // -----------------------------
  const pageCount = Math.ceil(filteredPosts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedPosts.slice(start, start + rowsPerPage);
  }, [sortedPosts, page, rowsPerPage]);

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
