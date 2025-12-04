"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  SortDescriptor,
  getKeyValue,
} from "@heroui/react";

import React from "react";
import type { DataTableType, Post } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import type { CommentTableType } from "@/types/comments";
import type { SortableColumn } from "@/types/sortableColumn";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { POST_COLUMNS } from "@/shared/constants/posts.constants";

export default function PostsTable({
  posts,
  users,
  comments,
}: {
  posts: DataTableType;
  users: UserTableType;
  comments: CommentTableType;
}) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

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

  //Cортировка
  const sortedPosts = React.useMemo(() => {
    const sorted = [...filteredPosts];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumn;

      let x: any;
      let y: any;

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
          x = a[col];
          y = b[col];
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

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedPosts.slice(start, start + rowsPerPage);
  }, [sortedPosts, page]);

  return (
    <Table
      aria-label="Table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{ table: "min-h-auto text-gray-800" }}
      topContent={
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
        />
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
      <TableHeader columns={POST_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={column.sorting}
            align={
              ["views", "likes", "comments", "button"].includes(column.key)
                ? "center"
                : "start"
            }
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} emptyContent="Ничего не найдено">
        {(item: Post) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "title")
                return <TableCell><p className="font-semibold">{item.title}</p></TableCell>;
              if (columnKey === "likes")
                return <TableCell>{item.reactions.likes}</TableCell>;

              if (columnKey === "author") {
                const author = users.get(item.userId);
                return (
                  <TableCell>
                    <div className="flex gap-2 items-center min-h-6">
                      {author?.image ? (
                        <img
                          className="max-w-6"
                          src={author.image}
                          alt="User avatar"
                        />
                      ) : (
                        <img
                          className="max-w-6"
                          src="/no-avatar-user.svg"
                          alt="Cant such user avatar"
                        />
                      )}
                      {author
                        ? `${author.firstName} ${author.lastName}`
                        : "Unknown"}
                    </div>
                  </TableCell>
                );
              }

              if (columnKey === "comments") {
                return (
                  <TableCell className="flex justify-center text-center">
                    {comments?.get(item.id)
                      ? `${comments?.get(item.id)?.comments.length}`
                      : 0}
                  </TableCell>
                );
              }
              if (columnKey === "button") {
                return (
                  <TableCell className="max-w-1">
                    <div>
                      <img
                        className="cursor-pointer"
                        src="/arrow-button.svg"
                        alt=""
                      />
                    </div>
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
