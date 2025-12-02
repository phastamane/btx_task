"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@heroui/react";

import React from "react";
import type { DataTableType, Post } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import InputSearch from "./Input";
import Pagination from "./Pagination";
import SelectPage from "./SelectPage";

const columns = [
  { key: "id", label: "ID", sorting: true },
  { key: "title", label: "Пост", sorting: false },
  { key: "author", label: "Автор", sorting: false },
  { key: "views", label: "Просмотры", sorting: true },
  { key: "likes", label: "Лайки", sorting: true },
  { key: "comments", label: "Коментарии", sorting: true },
];

export default function DataTable({
  posts,
  users,
}: {
  posts: DataTableType;
  users: UserTableType;
}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 12;

  const [filterValue, setFilterValue] = React.useState("");

  // -----------------------------
  // ФИЛЬТРАЦИЯ
  // -----------------------------
  const filteredPosts = React.useMemo(() => {
    if (!filterValue.trim()) return posts;

    return posts.filter((p) =>
      p.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [posts, filterValue]);

  // -----------------------------
  // ПАГИНАЦИЯ
  // -----------------------------
  const pageCount = Math.ceil(filteredPosts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredPosts.slice(start, start + rowsPerPage);
  }, [filteredPosts, page]);


  return (
    <Table
      aria-label="Table"
      sortDescriptor={undefined}
      classNames={{ table: "min-h-auto text-gray-800" }}
      topContent={
        <InputSearch filterValue={filterValue} setFilterValue={setFilterValue} setPage={setPage} />
      }
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-between ">
          <SelectPage
            pagesLength={filteredPosts.length}
            rowsPerPage={rowsPerPage}
            pageCount={pageCount}
            setPage={setPage}
          />

          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      }
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sorting}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} emptyContent="Ничего не найдено">
        {(item: Post) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "likes") return <TableCell>{item.reactions.likes}</TableCell>;

              if (columnKey === "author") {
                const author = users.get(item.userId);
                return (
                  <TableCell>
                    {author ? `${author.firstName} ${author.lastName}` : "Unknown"}
                  </TableCell>
                );
              }

              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
