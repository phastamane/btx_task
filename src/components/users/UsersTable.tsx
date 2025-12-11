"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@heroui/react";

import React from "react";
import type { UserInterface } from "@/types/users";
import type { Post } from "@/types/posts";
import type { CommentItem } from "@/types/comments";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { USERS_COLUMNS } from "@/shared/constants/users.constants";
import { SortableColumnUsers } from "@/types/sortableColumn";
import { usersRenderCell } from "./usersRenderCell";

export default function UsersTable({
  users,
  admins,
  usersPosts,
  userComments,
}: {
  users: UserInterface[];
  admins: UserInterface[]
  usersPosts: Map<number, { post: Post[]; likes: number }>;
  userComments: Map<number, { comments: CommentItem[] }>;
}) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const usersArr = [...admins, ...users]
  .filter((user, index, arr) => 
    index === arr.findIndex(u => u.id === user.id)
  );


  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const [filterValue, setFilterValue] = React.useState("");

  const filteredPosts = React.useMemo(() => {
    if (!filterValue.trim()) return usersArr;

    return usersArr.filter((user) => {
      const expression =
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      return expression.includes(filterValue.toLowerCase());
    });
  }, [filterValue, usersArr]);

  const sortedPosts = React.useMemo(() => {
    const sorted = [...filteredPosts];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumnUsers;

      if (col === "likes") {
        return (
          (usersPosts.get(a.id)?.likes ?? 0) -
          (usersPosts.get(b.id)?.likes ?? 0)
        );
      }

      if (col === "posts") {
        return (
          (usersPosts.get(a.id)?.post.length ?? 0) -
          (usersPosts.get(b.id)?.post.length ?? 0)
        );
      }

      if (col === "comments") {
        return (
          (userComments.get(a.id)?.comments.length ?? 0) -
          (userComments.get(b.id)?.comments.length ?? 0)
        );
      }

      const x = a[col];
      const y = b[col];

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();

    return sorted;
  }, [filteredPosts, sortDescriptor, usersPosts, userComments]);

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
        />
      }
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-between ">
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
        {(item: UserInterface) => (
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
