"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
  getKeyValue,
} from "@heroui/react";

import React from "react";
import type { CommentItem } from "@/types/comments";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { POST_COLUMNS } from "@/shared/constants/posts.constants";
import { COMMENTS_COLUMNS } from "@/shared/constants/comments.constants";
import { UserInterface } from "@/types/users";

export default function CommentsTable({
  commentsMap,
  users,
  postId,
}: {
  commentsMap: Map<number, { comments: CommentItem[] }>;
  users: Map<number, UserInterface>;
  postId: number;
}) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const comments = commentsMap?.get(postId)?.comments ?? [];
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 12;

  const [filterValue, setFilterValue] = React.useState("");

  // ФИЛЬТР
  const filteredComments = React.useMemo(() => {
    if (!filterValue.trim()) return comments;

    return comments.filter((c) =>
      c.body.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [comments, filterValue]);

  // СОРТ
  const sortedComments = React.useMemo(() => {
    const sorted = [...filteredComments];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as keyof CommentItem;

      const x = a[col];
      const y = b[col];

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();
    return sorted;
  }, [filteredComments, sortDescriptor]);

  // ПАГИНАЦИЯ
  const pageCount = Math.ceil(filteredComments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedComments.slice(start, start + rowsPerPage);
  }, [sortedComments, page]);

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
        wrapper: "pt-0 px-0",
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
            pagesLength={filteredComments.length}
            rowsPerPage={rowsPerPage}
            pageCount={pageCount}
            setPage={setPage}
          />

          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      }
      bottomContentPlacement="outside"
    >
      <TableHeader columns={COMMENTS_COLUMNS}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={items} emptyContent="Ничего не найдено">
        {(item: CommentItem) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              switch (columnKey) {

                case "author":
                  return (
                     <TableCell>
                    <div className="flex gap-2 items-center min-h-6">
                      <img
                        className="w-6 h-6 rounded-full object-cover"
                        src={users.get(item.user.id)!.image ?? "/no-avatar-user.svg"}
                        alt="User avatar"
                      />
                      <p className="font-semibold">{users.get(item.user.id)?.firstName}</p>
                    </div>
                    </TableCell>
                  );
                default:
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
