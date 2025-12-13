"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import type { UserInterface } from "@/types/users";
import type { Post } from "@/types/posts";
import type { CommentItem } from "@/types/comments";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { USERS_COLUMNS } from "@/shared/constants/users.constants";
import { usersRenderCell } from "./usersRenderCell";
import { useUsersTable } from "@/hooks/useUsersTable";

export default function UsersTable({
  users,
  admins,
  usersPosts,
  userComments,
}: {
  users: UserInterface[];
  admins: UserInterface[];
  usersPosts: Map<number, { post: Post[]; likes: number }>;
  userComments: Map<number, { comments: CommentItem[] }>;
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
  } = useUsersTable(users, admins, usersPosts, userComments);

  return (
    <Table
      aria-label="Users table"
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
          placeholder="Поиск по пользователям"
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
      <TableHeader columns={USERS_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={column.sorting}
            align={
              ["posts", "likes", "comments", "role"].includes(column.key)
                ? "center"
                : "start"
            }
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} emptyContent="Ничего не найдено">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {usersRenderCell(item, columnKey, usersPosts, userComments)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
