"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import type { DataTableType, Post } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import type { CommentTableType } from "@/types/comments";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { POST_COLUMNS } from "@/shared/constants/posts.constants";
import { postsRenderCell } from "./postsRenderCell";
import { usePostsTable } from "@/hooks/usePostsTable";
import { useRouter } from "next/navigation";
import { ArrowIcon } from "../icons/Icons";

export default function PostsTable({
  posts,
  users,
  comments,
}: {
  posts: DataTableType;
  users: UserTableType;
  comments: CommentTableType;
}) {
  const {
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
  } = usePostsTable(posts, comments);

  const router = useRouter();

  return (
    <Table
      aria-label="Posts table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        table: "text-gray-800",
        base: "max-h-full",
        th: "text-gray-500 bg-white font-sm",
        tr: "h-[54px] border-b-1 border-gray-200 last:border-b-0",
        wrapper: "pt-0",
      }}
      topContent={
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
          placeholder="Поиск по публикациям"
        />
      }
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-between">
          <SelectPage
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
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
            {(columnKey) =>
              columnKey === "button" ? (
                <TableCell>
                  <div
                    onClick={() =>
                      router.push(`/posts/${item.id}/comments`)
                    }
                    className="cursor-pointer"
                  >
                    <ArrowIcon />
                  </div>
                </TableCell>
              ) : (
                <TableCell>
                  {postsRenderCell(item, columnKey, users, comments)}
                </TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
